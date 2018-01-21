const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
  new UglifyJSPlugin({
    parallel: 10,
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
];

module.exports = require('./webpack.base.js')({
  entry: {
    bundle: ['babel-polyfill', './src/index.js'],
  },
  plugins: plugins,
});
