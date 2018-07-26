const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');
const webpackStatsPlugin = require('./webpackGenStatsPlugin');

module.exports =
  merge.smart(commonConfig, {
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, '../dist/statics'),
      publicPath: '/statics/',
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
        filename: '[name].[chunkhash].js',
        minChunks: Infinity
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpackStatsPlugin(),
    ],
  });