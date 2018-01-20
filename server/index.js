const express = require('express');
const path = require('path');
const opn = require('opn');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack/webpack.config');

const port = 3000;

const app = express();

const compiler = webpack(config);

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  quiet: true,
});

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000,
});

app.use(devMiddleware);
app.use(hotMiddleware);

let _resolve = null;
const readyPromise = new Promise(resolve => {
  _resolve = resolve;
});

// Serve static assets
app.use('/static', express.static('./static'));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

const uri = `http://localhost:${port}`;

/* eslint-disable no-console */
console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log(`> Listening at ${uri}\n`);
  opn(uri);
  _resolve();
});
/* eslint-enable no-console */

const server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  },
};
