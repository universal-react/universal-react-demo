const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: path.resolve(__dirname, '../src/render.js'),
  output: {
    path: path.resolve(__dirname, '../statics'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  module: {
    rules: [{
      test: /jsx?/,
      use: {
        loader: 'babel-loader',
      },
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './tmpl.html'),
      inject: true,
    })
  ],
  devServer: {
    port: 8388,
  },
  devtool: 'eval-source-map'
};

module.exports = config;