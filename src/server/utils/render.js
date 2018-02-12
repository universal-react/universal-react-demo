import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { StaticRouter } from 'react-router-dom';

import initialStore from '../../client/store';

import Root from '../../client/container/root';

import tmpl from './tmpl';

function render2String({ store, location, context }) {
  return renderToString( 
    <Provider store={store}>
      <StaticRouter location={location} context={context}>
        <Root/>
      </StaticRouter>
    </Provider>
  );
}

function render(clientStats) {
  return function (req, res) {
    const store = initialStore();
    const context = {};
    const location = req.url;
    render2String({ store, location, context }); // 需要先渲染一次，否则 match 的是 UniversalComponent，找不到正确组件的 getInitialData
    const content = render2String({ store, location, context });
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });
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
  }
}

export default render;