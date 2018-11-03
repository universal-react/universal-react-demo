/* tslint:disable variable-name no-console no-empty */
import { Request, Response } from 'express';
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

import tmpl from './tmpl';

function render2String({ store, location, context = {} }) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        {renderRoutes(routers)}
      </StaticRouter>
    </Provider>
  );
}

function render(clientStats: Stats) {
  return function handleRenderRequest(req: Request, res: Response) {
    const store = initialStore();
    const { dispatch } = store;
    const context = {};
    const location = req.url;
     // find the current router chain
    const routeBranch: any[] = matchRoutes(routers, location);

    const UniversalComponentPreload = routeBranch.map(router => {
      const noop = () => {};
      return router.route.component.preload ? router.route.component.preload()
        .then(UniversalComponent =>
          UniversalComponent.getInitialData ?
          UniversalComponent.getInitialData(dispatch) :
          noop
        ) : noop;
    });
    Promise.all(UniversalComponentPreload)
      .then(() => {
        const content = render2String({ store, location, context });
        const chunkNames = flushChunkNames();
        const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });
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
  };
}

export default render;
