/* tslint:disable variable-name no-console no-empty */
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { flushChunkNames } from 'react-universal-component/server';
import { Stats } from 'webpack';
import flushChunks from 'webpack-flush-chunks';

import routers from '../../client/routers';
import initialStore from '../../client/store';

import tmpl from '../utils/tmpl';

import config from '../config';

const { PORT, DEV } = config;

function render2String({ store, location, context = {} }) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        {renderRoutes(routers)}
      </StaticRouter>
    </Provider>
  );
}

const ssrMiddleware = (stats: Stats): RequestHandler => (req, res, next) => {
  const acceptHeader = req.header('accept');
  if (typeof acceptHeader === 'string' && acceptHeader.indexOf('text/html') > -1) {
    if (!stats) return res.send('please wait webpack done...');
    const store = initialStore();
    const { dispatch } = store;
    const context = {};
    const location = req.url;
     // find the current router chain
    const routeBranch: any[] = matchRoutes(routers, location);
    const UniversalComponentPreload = routeBranch.map(router => {
      const nope = () => {};
      if (router.route.component.preload) {
        return router.route.component.preload()
          .then(UniversalComponent => {
            if (UniversalComponent.getInitialData) {
              return dispatch(UniversalComponent.getInitialData());
            }
            return nope;
          });
      }
      return nope;
    });
    Promise.all(UniversalComponentPreload)
      .then(() => {
        const content = render2String({ store, location, context });
        const chunkNames = flushChunkNames();
        const { js, styles, cssHash } = flushChunks(stats, { chunkNames });
        res.send(
          tmpl({
            content,
            title: '',
            styles: styles.toString(),
            scripts: js.toString(),
            cssHash: cssHash.toString(),
            initialStore: store.getState(),
          })
        );
      })
      .catch(e => {
        // throw new Error(e);
        res.send(e.stack);
      });
  } else {
    next();
  }
};

export default ssrMiddleware;
