var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: path.join(__dirname, "js", "index"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        loader: [
          'babel-loader'
        ],
        query: {
          cacheDirectory: "babel-cache"
        }
      }
    ]
  }
}