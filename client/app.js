import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
// import { AppContainer } from 'react-hot-loader'

// console.log('container', AppContainer)

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.hydrate(<App />, root)
}


render(<App />)

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    // const NextApp  = require('./App.jsx').default
    // ReactDOM.hydrate(<NextApp />, document.getElementById('root'))
    // render(<NextApp />)
    console.log('---hot---')
  })
}