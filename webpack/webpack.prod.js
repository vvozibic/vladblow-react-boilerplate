const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const plugins = [
  new UglifyJSPlugin({
    beautify: false,
    comments: false,
    compress: {
      sequences: true,
      booleans: true,
      loops: true,
      unused: true,
      warnings: false,
      drop_console: true,
      unsafe: true,
    },
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
];

if (process.env.ANALYZER) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = require('./webpack.base.js')({
  entry: {
    bundle: ['babel-polyfill', './src/index.js'],
  },
  plugins: plugins,
});
