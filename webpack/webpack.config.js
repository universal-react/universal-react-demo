const webpack = require('webpack');
const path = require('path');
const qs = require('querystring');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
  entry: [
    // 'webpack-hot-middleware/client',
    path.resolve(__dirname, '../src/client/render.js'),
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
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
    }, 
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader?' + qs.stringify({
        modules: true,
        importLoaders: 1,
        localIdentName: '[name]-[local]-[hash:base64:5]'
      })
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './tmpl.html'),
    })
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: '#eval-source-map'
};

module.exports = config;