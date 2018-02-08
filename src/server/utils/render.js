// lib
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { renderRoutes, matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import initialStore from '../../client/store';
import App from '../../client/app';

function render(clientStats) {

  return function (req, res, next) {
    const store = initialStore();
    const { dispatch } = store;
    const content = renderToString( // !!! 必须先渲染！因此此处渲染会调用指定的js和css从而让flushchunkname知道要插入哪些js，css
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    );
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })
    console.log(content)
    res.send(
      `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${styles.toString()}
        </head>
        <body>
          <div id="app">${content}</div>
          ${js.toString()}
          ${cssHash.toString()}
        </body>
      </html>`
    )
  }
}

export default render;