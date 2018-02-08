const webpack = require('webpack');
const path = require('path');
const qs = require('querystring');
const ManifestPlugin = require('webpack-manifest-plugin');

const config = {
  entry: {
    app: path.resolve(__dirname, '../src/client/render.js'),
    vendor1: [
      'react',
      'react-dom',
      'redux'
    ],
    vendor2: [
      'react-router',
      'react-router-dom'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/server/statics'),
    filename: 'bundle.js',
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
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
    new ManifestPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor1',
      filename: 'vendor1.js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor2',
      filename: 'vendor2.js'
    }),
    new webpack.DefinePlugin({
      'process.env': 'production'
    })
  ],
  devtool: '#eval-source-map'
};

module.exports = config;