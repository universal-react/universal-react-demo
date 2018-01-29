
import http from 'http';
import path from 'path';
import React from 'react';
import fs from 'fs';
import st from 'st';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import { StaticRouter, matchPath } from 'react-router-dom';
import routers from '../src/routers';

import { tmpl } from './utils/tmpl';

import { userList } from './api/user';

const ROOTPATH = path.resolve('./');
const PORT = 8388;

const staticsService = st({ url: '/statics', path: path.join(ROOTPATH, 'dist') })

const serve = http.createServer((req, res) => {
  const stHandled = staticsService(req, res);
  if (stHandled) return;
  if (req.url === '/user/list') {
    userList(req,res);
  } else {
    const currentRouter = routers.find(c => c.path === req.url);
    if (currentRouter) {
      let cssContext = '';
      const currentComponent = currentRouter.component;
      // get data
      const promises = [];
      routers.some(route => {
        const match = matchPath(req.url, route)
        if (match)
          promises.push(route.loadData(match))
        return match
      });

      if (promises.length) {
        Promise.all(promises).then(data => {
          console.log(data);
          render(data[0]);
        });
      } else {
        render();
      }

      function render(data = {}) {
        // render component
        const content = renderToString(
          <StaticRouter location={req.url} context={data}>
            {renderRoutes(routers)}
          </StaticRouter>
        );
  
        // send
        res.end(tmpl({
          header: currentComponent.getCssFile ? `<link rel="stylesheet" href="/statics/css/${currentComponent.getCssFile}.css" >` : '',
          content,
        }));
      }

    } else {
      res.statusCode = 404;
      res.end('404');
    }
  }
});

serve.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});

export default serve;