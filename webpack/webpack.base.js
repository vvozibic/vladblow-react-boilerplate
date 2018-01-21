const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const SvgStore = require('webpack-svgstore-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = options => ({
  entry: options.entry,
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
  plugins: options.plugins.concat([
    new CleanWebpackPlugin(['public/**/*.*'], { root: path.resolve(__dirname, '../') }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname, '../public/static'),
      },
    ]),
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
  ]),
});
