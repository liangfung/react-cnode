const axios = require('axios')
const webpack = require('webpack')
const MemeryFs = require('memory-fs')
const path = require('path')
const proxy = require('http-proxy-middleware')
const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server.render')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:7000/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}
const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  let script = new vm.Script(wrapper, {
    filename,
    displayErrors: true
  })
  let result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

const NativeModule = require('module')
const vm = require('vm')
const mfs = new MemeryFs()
const serverCompiler = webpack(serverConfig) // 根据server-config文件，编译sever-entry文件
serverCompiler.outputFileSystem = mfs  // 将编译好的server-entry-bundle保存在内存中
let serverBundle   // bundle 模块
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warning => console.log(warning))
  // bundle path就是config的output的path，
  // 用于 http get 到在client端的devserver编译生成的 server-entry-bundle
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  // mfs读取保存成内存中的编译之后的bundle，此时为 string 类型
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  // 将bundle string加载并包一层，转化成module，并返回module
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports
})

module.exports = function (app) {

  app.use('/public', proxy({
    target: 'http://localhost:7000'
  }))

  app.get('*', function (req, res, next) {  // 测试环境中读取 client端的webpack-dev-server在内存中生成的编译文件
    console.log(`req url: ${req.url}, method: ${req.method}`)
    getTemplate().then(template => {
      return serverRender(serverBundle, template, req, res)
    }).catch(next)
  })
}