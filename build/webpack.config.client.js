const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

let config = merge(baseConfig, {
  target: 'web',
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HTMLPlugin(
      {
        template: path.join(__dirname, '../client/template.html'),
        filename: 'index.html'
      }
    )
  ]
})

if (isDev) {
  config.devServer = {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, '../dist'),
    port: 7000,
    hot: true,
    historyApiFallback: {
      index: '/public/index.html'
      // rewrites: [
      //   { from: /\//, to: path.join('/public', 'index.html') }
      // ]
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3012'
      }
    }
  }

  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config