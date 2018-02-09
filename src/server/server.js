
import chokidar from 'chokidar';
import http from 'http';
import path from 'path';

import express from 'express';

// express middleware
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';

// webpack required
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../../webpack/webpack.dev';

import config from './config';

// server api
import userRouter from './routes/user'; 


const app = express();
const {  PORT, DEV } = config;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRouter);


app.use(favicon(path.join(__dirname, '../../favicon.ico')));

if (DEV) {

  let clientStats = null; // https://doc.webpack-china.org/api/stats/#src/components/Sidebar/Sidebar.jsx
  const compile = webpack(webpackDevConfig);
  
  // use webpack in dev enviroment
  app.use(webpackDevMiddleware(compile, {
    publicPath: webpackDevConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compile));
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

  compile.plugin('done', stats => {
    clientStats = stats.toJson();
    console.log("Clearing /client/ module cache from server");
    Object.keys(require.cache).forEach(function (id) {
      if (/client/.test(id)) {
        delete require.cache[id];
      }
    });
  });

  app.get('*', (req, res, next) => {
    if (!clientStats) {
      res.send('please wait webpack done...');
      return;
    }
    require('./utils/render').default(clientStats)(req, res, next);
  });

} else {

  app.use('/statics', express.static(path.join(process.cwd(), 'dist/statics')));
  
  const stats = require(path.join(process.cwd(), 'dist/statics', 'webpack-stats.json'));

  app.get('*', (req, res, next) => {
    require('./utils/render').default(stats.statsJson)(req, res, next);
  });
}

const serve = http.createServer(app);
serve.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});
