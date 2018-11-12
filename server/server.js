const express = require('express')
const ReactSSR = require('react-dom/server')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const fs = require('fs')
const app = express()
const favicon = require('serve-favicon')

const isDev = process.env.NODE_ENV === 'development'
const PORT = 3012

app.use(favicon(path.join(__dirname, '../favicon.ico')))

// 解析json格式数据并挂载在req.body上
// Parse incoming request bodies in a moddleware before your handlers,
// available under the `req.body` proterty.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 把session存到运行时内存中
app.use(session({
  maxAge: 10 * 1000 * 60,
  name: 'cid',
  resave: false,
  saveUninitialized: false,
  secret: 'react-cnode haha'
}))

// api 代理
app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')// 读取末班模板
  app.use('/public', express.static(path.join(__dirname, '../dist')))  // 静态资源

  app.get('/', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)  // 将serverEntry renderToString
    const result = template.replace('<!--app-->', appString)// 将string拼接到模板中
    res.send(result)  // http response
  })
} else {  // 测试环境
  const devStatic = require('./util/dev-static')
  devStatic(app)
}

app.listen(PORT, function () {
  console.log(`server is listening on port ${PORT}`)
})