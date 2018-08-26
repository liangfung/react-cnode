import App from './views/App.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.hydrate(<Component />, root)
  // ReactDOM.render(<Component />, root)
}

render(App)
// 在Dev环境并且devServer.hot = true
if (module.hot) {
  // app.jsx更新了
  // `module.hot.accept('./name', callback)`
  module.hot.accept('./views/App.jsx', () => {
    // require更新后的app.jsx 重新render
    const NextApp  = require('./views/App.jsx').default
    render(NextApp)
    console.log('---HMR work---')
  })
}