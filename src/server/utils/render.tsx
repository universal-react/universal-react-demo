import { Request, Response } from 'express';
import * as React from 'react';
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

function render2String({ store, location, context }) {
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
    const routeBranch = matchRoutes(routers, location);
    // must be rendered one time.Or you will get UniversalComponent rether than current Component
    // and then you can't get the current getInitialData function.
    render2String({ store, location, context });
    const promiseList = routeBranch.map(({ route }) => {
      const component: any = route.component;
      const noop = Promise.resolve();
      const { WrappedComponent } = component;
      if (WrappedComponent && WrappedComponent.getInitialData) {
        return WrappedComponent.getInitialData(dispatch);
      }
      return noop;
    });

    Promise.all(promiseList)
      .then(() => {
        // must rendered at first.
        // flushchunkname will find current js and css file at this time.
        const content = render2String({ store, location, context });
        const chunkNames = flushChunkNames();
        const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });
        console.log(js.toString(), styles.toString(), cssHash.toString());
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
        res.send(e);
      });

  };
}

export default render;
