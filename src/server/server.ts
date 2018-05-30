/* eslint no-useless-escape: 0, no-console:0  */
// basic lib
const hook = require('css-modules-require-hook');
require('asset-require-hook')({
  extensions: ['jpg', 'png'],
  name: '[path][name].[ext]',
  // ${cwd}/src/client/assets/images/pig.jpg
  publicPath: result => {
    const cwd = process.cwd();
    const publicPath = result.replace(cwd, '/statics'); // TODO get publicPath above
    return publicPath;
  }
});
require('raw-module-require-hook')({
  extensions: ['html', 'txt']
});

hook({
  generateScopedName: '[name]-[local]-[hash:base64:5]',
});

// import hook from 'css-modules-require-hook';

import chalk from 'chalk';
import * as chokidar from 'chokidar';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';

// express middleware
import * as bodyParser from 'body-parser';
import * as favicon from 'serve-favicon';

// webpack required
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';

const webpackDevConfig = require('../../webpack/webpack.dev');

import config from './config';

const app = express();
const { PORT, DEV } = config;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', (req, res, next) => {
  require('./routes/user')(req, res, next);
});

app.use(favicon(path.join(__dirname, '../../favicon.ico')));

if (DEV) {
  // https://doc.webpack-china.org/api/stats/#src/components/Sidebar/Sidebar.jsx
  let clientStats = null;
  const compile = webpack(webpackDevConfig);

  // use webpack in dev enviroment
  app.use(webpackDevMiddleware(compile, {
    publicPath: webpackDevConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compile));

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  const watcher = chokidar.watch(path.join(process.cwd(), 'src'));

  watcher.on('ready', () => {
    watcher.on('all', (e, p) => {
      if (require.cache[p]) {
        // tslint:disable-next-line:no-console
        console.log(`[chokidar] clearing ${p} cache`);
        delete require.cache[p];
      }
    });
  });

  compile.plugin('done', stats => {
    clientStats = stats.toJson();
    Object.keys(require.cache).forEach(id => {
      if (/src[\\|\/]client/.test(id)) {
        // tslint:disable-next-line:no-console
        console.log(`[chokidar] clearing ${id} cache`);
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
  app.use('/src', express.static(path.join(process.cwd(), 'src')));

} else {

  app.use('/statics', express.static(path.join(process.cwd(), 'dist/statics')));

  const stats = require(path.join(process.cwd(), 'dist/statics', 'webpack-stats.json'));

  app.get('*', (req, res, next) => {
    require('./utils/render').default(stats.statsJson)(req, res, next);
  });
}

const serve = http.createServer(app);

serve.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(chalk.green(`server start on port ${PORT}`));
});

export default serve;
