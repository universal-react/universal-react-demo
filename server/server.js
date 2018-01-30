
import http from 'http';
import path from 'path';
import React from 'react';
import fs from 'fs';
import st from 'st';
import { renderToString } from 'react-dom/server';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { StaticRouter, matchPath } from 'react-router-dom';

import routers from '../src/routers';
import initialStore from '../src/store';

import { tmpl } from './utils/tmpl';

import { userList } from './api/user';

const ROOTPATH = path.resolve('./');
const PORT = 8388;

const store = initialStore();

const staticsService = st({ url: '/statics', path: path.join(ROOTPATH, 'dist') })

const serve = http.createServer((req, res) => {
  const stHandled = staticsService(req, res);
  if (stHandled) return;
  if (req.url === '/user/list') {
    userList(req,res);
  } else {
    const { dispatch } = store;
    const branch = matchRoutes(routers, req.url);
    const styleList = [];
    const promiseList = branch.map(({ route }) => {
      const { component } = route;
      if (component.getCssFile) {
        styleList.push(`<link rel="stylesheet" href="/statics/css/${component.getCssFile}.css" >`);
      }
      return route.component.getInitialData ? route.component.getInitialData(dispatch) : Promise.resolve();
    });
    console.log(styleList);
    Promise.all(promiseList).then(v => {
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={{}}>
            {renderRoutes(routers)}
          </StaticRouter>
        </Provider>
      );
      console.log(content);
      res.end(
        tmpl({
          title: '',
          header: styleList.join('\n'),
          content,
          initialState: store.getState(),
        })
      )
    });
  }
});

serve.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});

export default serve;