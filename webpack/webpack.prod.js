const webpack = require('webpack');
const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const webpackStatsPlugin = require('./webpackGenStatsPlugin');
const babelOptions = require('./babel_options');

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
        options: babelOptions
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
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: true,
    }),
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].[chunkhash].js',
      minChunks: Infinity
    }),
    /**
     * you don't need these plugin in production enviromment
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