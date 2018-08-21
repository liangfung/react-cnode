const path = require('path')

const publicAssetsPath = '/plublic/'

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: publicAssetsPath
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
}