const express = require('express')
const ReactSSR = require('react-dom/server')
const serverEntry = require('../dist/server-entry').default
const app = express()

console.log(serverEntry)

app.get('*', function(req, res) {
  const appString = ReactSSR.renderToString(serverEntry)
  res.send(appString)
})

app.listen(3000, function(){
  console.log('server is listening on 3000')
})