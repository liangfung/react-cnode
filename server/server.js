const express = require('express')
const ReactSSR = require('react-dom/server')
const serverEntry = require('../dist/server-entry').default
const path = require('path')
const fs = require('fs')
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
const app = express()

app.use('/public', express.static(path.join(__dirname, '../dist')))

app.get('/', function(req, res) {
  const appString = ReactSSR.renderToString(serverEntry)
  const result = template.replace('<!--app-->', appString)
  res.send(result)
})

app.listen(3000, function(){
  console.log('server is listening on 3000')
})