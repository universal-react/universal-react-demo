import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { renderRoutes, matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';

import initialStore from '../../client/store';
import routers from '../../client/routers';

import tmpl from './tmpl';

function render(clientStats) {

  return function (req, res, next) {
    const store = initialStore();
    const { dispatch } = store;
    const branch = matchRoutes(routers, req.url);
    const preContent = renderToString( // !!! 必须先渲染！因此此处渲染会调用指定的js和css从而让flushchunkname知道要插入哪些js，css
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          {renderRoutes(routers)}
        </StaticRouter>
      </Provider>
    );
    const promiseList = branch.map(({ route }) => {
      const { component } = route;
      const noop = Promise.resolve();
      const { WrappedComponent } = component;
      if (WrappedComponent && WrappedComponent.getInitialData) {
        return WrappedComponent.getInitialData(dispatch);
      } else {
        return noop;
      }
    });

    Promise.all(promiseList)
      .then(v => {
        console.log(v);
        const content = renderToString( // !!! 必须先渲染！因此此处渲染会调用指定的js和css从而让flushchunkname知道要插入哪些js，css
          <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
              {renderRoutes(routers)}
            </StaticRouter>
          </Provider>
        );
        const chunkNames = flushChunkNames();
        const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })
        res.send(
          tmpl({
            title: '',
            styles: styles.toString(),
            scripts: js.toString(),
            cssHash: cssHash.toString(),
            initialStore: store.getState(),
            content,
          })
        );
      })
      .catch(e => {
        res.send(e);
      })

  }
}

export default render;