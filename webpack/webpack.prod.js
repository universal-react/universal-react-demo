const webpack = require('webpack');
const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const webpackStatsPlugin = require('./webpackStatsPlugin');

const config = {
  entry: [
    path.resolve(__dirname, '../src/client/render.js'),
  ],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist/statics'),
    publicPath: '/statics/',
  },
  resolve: {
    extensions: ['.js', '.jsx']
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
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].[chunkhash].js',
      minChunks: Infinity
    }),
    /**
     * you don't need those plugin in production enviromment
     new WriteFilePlugin(),
     new WebpackModulesManifestPlugin(),
     */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpackStatsPlugin(),
  ],
  devtool: 'source-map',
};

module.exports = config;