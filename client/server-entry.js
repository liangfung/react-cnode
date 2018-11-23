import React from 'react'
import App from './views/App.jsx'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import { createStoreMap } from './store/store'

useStaticRendering(true)

export default (stores, appStateContext, url) => {
  return (
    <Provider {...stores}>
      <StaticRouter context={appStateContext} location={url}>
        <App />
      </StaticRouter>
    </Provider>
  )
}

export { createStoreMap }