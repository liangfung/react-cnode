const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === "development"

const config = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, '../node_modules')
      }
    ]
  },
  plugins: [
    new HTMLPlugin(
      {
        template: path.join(__dirname, '../client/template.html'),
        filename: 'index.html'
      }
    )
  ]
}

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, '../dist'),
    port: 7000,
    hot: true,
    historyApiFallback: {
      // index: '/public/index.html'
      rewrites: [
        { from: /\//, to: path.join('/public', 'index.html') }
      ]
    }
  }

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = config
