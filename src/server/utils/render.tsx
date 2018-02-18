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
    const routeBranch = matchRoutes(routers, location); // 找到指定的 route 链路
    // 需要先渲染一次，否则 match 的是 UniversalComponent，找不到正确组件的 getInitialData
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
        // 必须先渲染！因此此处渲染会调用指定的js和css从而让flushchunkname知道要插入哪些js，css
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
        res.send(e);
      });

  };
}

export default render;
