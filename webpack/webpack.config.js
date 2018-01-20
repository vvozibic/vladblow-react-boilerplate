const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const SvgStore = require('webpack-svgstore-plugin');

const hotMiddlewareScript =
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

module.exports = {
  entry: {
    bundle: ['./src/index.js', hotMiddlewareScript],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../public'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      r: path.join(__dirname, '../src/_root'),
      common: path.join(__dirname, '../src/common'),
      features: path.join(__dirname, '../src/features'),
      components: path.join(__dirname, '../src/common/components'),
    },
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, '../public')]),
    new HtmlWebpackPlugin({
      template: 'templates/index.html',
      filename: '../public/index.html',
      inject: 'body',
    }),
    new SvgStore({
      prefix: '',
      svgoOptions: {
        plugins: [
          {
            removeTitle: true,
          },
          {
            removeStyleElement: true,
          },
        ],
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
