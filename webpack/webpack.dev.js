const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin'); // here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const WebpackModulesManifestPlugin = require('webpack-modules-manifest-plugin');
const WebpackStatsPlugin = require('./webpackStatsPlugin');

const config = {
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '../src/client/render.js'),
  ],
  output: {
    path: path.resolve(__dirname, '../dist/statics'),
    filename: '[name].js',
    publicPath: '/statics/',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  module: {
    rules: [{
      test: /jsx?/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            "stage-0",
            "es2015",
            "react"
          ],
          plugins: [
            "transform-runtime",
            "transform-decorators-legacy",
            "babel-plugin-transform-class-properties",
            "universal-import"
          ],
          babelrc: false
        }
      },
      exclude: /node_modules/,
    }, 
    {
      test: /\.css$/,
      use: ExtractCssChunks.extract({
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]'
            }
          }
        ]
      })
    }]
  },
  plugins: [
    new WriteFilePlugin(),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity
    }),
    new WebpackModulesManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new ManifestPlugin(),
    new WebpackStatsPlugin(),
  ],
  devtool: '#eval-source-map'
};

module.exports = config;