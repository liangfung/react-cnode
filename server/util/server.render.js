const ReactDOMServer = require('react-dom/server')
const asyncBootstrap = require('react-async-bootstrapper')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const Helmet = require('react-helmet').default

const getStoreState = (stores) => {
  let storeNameArr = Object.keys(stores)
  return storeNameArr.reduce((ret, storeName) => {
    ret[storeName] = stores[storeName].toJson()
    return ret
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    let routerContext = {}
    let createStoreMap = bundle.exports.createStoreMap
    let stores = createStoreMap()
    let createApp = bundle.exports.default
    const app = createApp(stores, routerContext, req.url)
    asyncBootstrap(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const content = ReactDOMServer.renderToString(app)
      const initialState = getStoreState(stores)
      const helmet = Helmet.rewind()
      // 把 server-entery  renderToString, 拼接到template
      // res.send(template.replace('<!--app-->', content))
      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(initialState),
        title: helmet.title.toString(),
        meta: helmet.meta.toString()
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}