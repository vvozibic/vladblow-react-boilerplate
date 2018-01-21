const path = require('path');
const webpack = require('webpack');

const hotMiddlewareScript =
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const plugins = [new webpack.HotModuleReplacementPlugin()];

module.exports = require('./webpack.base.js')({
  entry: {
    bundle: ['babel-polyfill', './src/index.js', hotMiddlewareScript],
  },
  plugins: plugins,
});
