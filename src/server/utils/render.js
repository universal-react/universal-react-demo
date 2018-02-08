// lib
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { renderRoutes, matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
// user config
import routers from '../../client/routers';
import initialStore from '../../client/store';
// template function return string
import { tmpl } from './tmpl';

function render(clientStats) {
  const chunkNames = flushChunkNames();
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })

  return function (req, res, next) {
    const store = initialStore();
    const { dispatch } = store;
    const branch = matchRoutes(routers, req.url);
    const styleObj = {};
    const promiseList = branch.map(({ route }) => {
      const { component } = route;
      return route.component.getInitialData ? route.component.getInitialData(dispatch) : Promise.resolve();
    });
  
    Promise.all(promiseList)
      .then(v => {
        const content = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
              {renderRoutes(routers)}
            </StaticRouter>
          </Provider>
        );
        console.log(styles.toString())
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
          ${js}
          ${cssHash}
        </body>
      </html>`
        )
        // res.end(
        //   tmpl({
        //     title: '',
        //     content,
        //     initialState: store.getState(),
        //     initialCss: styleObj
        //   })
        // );
      })
      .catch(err => {
        console.log(err);
        res.end("didn\'t match any route. Check your url");
      });
  }
}

export default render;