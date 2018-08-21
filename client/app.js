import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom'

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.hydrate(<Component />, root)
  // ReactDOM.render(<Component />, root)
}

render(App)

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp  = require('./App.jsx').default
    render(NextApp)
    console.log('---hot---')
  })
}