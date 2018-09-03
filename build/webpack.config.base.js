const path = require('path')

const publicAssetsPath = '/public/'

module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: publicAssetsPath
  },
  resolve: {
    extensions: ['.js', '.jsx']
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