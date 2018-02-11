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

function render2String({ store, location, context }) {
  return renderToString( 
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        {renderRoutes(routers)}
      </StaticRouter>
    </Provider>
  );
}

function render(clientStats) {
  return function (req, res) {
    const store = initialStore();
    const { dispatch } = store;
    const context = {};
    const location = req.url;
    const routeBranch = matchRoutes(routers, location); // 找到指定的 route 链路
    render2String({ store, location, context }); // 需要先渲染一次，否则 match 的是 UniversalComponent，找不到正确组件的 getInitialData
    const promiseList = routeBranch.map(({ route }) => {
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
      .then(() => {
        // 必须先渲染！因此此处渲染会调用指定的js和css从而让flushchunkname知道要插入哪些js，css
        const content = render2String({ store, location, context });
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