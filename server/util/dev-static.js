const axios = require('axios')
const webpack = require('webpack')
const MemeryFs = require('memory-fs')
const path = require('path')
const ReactDOMServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:7000/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
    }
  )
}

const Module = module.constructor

const mfs = new MemeryFs()
const serverCompiler = webpack(serverConfig) // 根据server-config文件，编译sever-entry文件
serverCompiler.outputFileSystem = mfs  // 将编译好的server-entry-bundle保存在内存中
let serverBundle   // bundle 模块

serverCompiler.watch({}, (err, stats) => {
  console.log('---watch work---')
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
  // console.log(bundlePath, '-----path----')

  // mfs读取保存成内存中的编译之后的bundle，此时为 string 类型
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  // console.log('-----bundle string------', bundle)

  const m = new Module()  // new 一个Module实例，将bundle string解析成模块
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})

module.exports = function (app) {

  app.use('/public', proxy({
    target: 'http://localhost:7000'
  }))

  app.get('*', function(req, res) {
    console.log('---req---')
    console.log(`url: ${req.url}, method: ${req.method}`)
    getTemplate().then(template => {
      // content
      const content = ReactDOMServer.renderToString(serverBundle)
      // 把 server-entry的内容 renderToString && 插入到模板
      res.send(template.replace('<!--app-->', content))
    })
  })

}