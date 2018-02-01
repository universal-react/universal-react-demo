
import chokidar from 'chokidar';
import http from 'http';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import favicon from 'serve-favicon';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack/webpack.config';

import bodyParser from 'body-parser';

import { tmpl } from './utils/tmpl';

import userRouter from './routes/user';

import render from './render';

const DISTDIR = path.join(__dirname, '../../dist');
const PORT = 8388;

const app = express();
const compile = webpack(webpackConfig);

app.use(favicon(path.resolve(__dirname, '../../dist/images/favicon.ico')));

// use webpack
app.use(webpackDevMiddleware(compile, {
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compile));

// /dist or /statics
app.use('/statics', express.static(DISTDIR));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRouter);

app.get('*', render);

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
const watcher = chokidar.watch('');

watcher.on('ready', function () {
  watcher.on('all', function () {
    console.log("Clearing /server/ module cache from server");
    Object.keys(require.cache).forEach(function (id) {
      if (/[\/\\]src[\/\\]/.test(id)) delete require.cache[id];
    });
  });
});

compile.plugin('done', function () {
  console.log("Clearing /client/ module cache from server");
  Object.keys(require.cache).forEach(function (id) {
    if (/client/.test(id)) {
      console.log(id)
      delete require.cache[id];
    }
  });
});

const serve = http.createServer(app);
serve.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});

export default serve;