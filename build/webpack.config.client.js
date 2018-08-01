const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public'
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
        template: path.join(__dirname, '../client/template.html')
      }
    )
  ]
}