// lib
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { StaticRouter, matchPath } from 'react-router-dom';
// user config
import routers from '../../client/routers';
import initialStore from '../../client/store';
// template function return string
import { tmpl } from './tmpl';


function render(req, res, next) {
  const store = initialStore();
  const { dispatch } = store;
  const branch = matchRoutes(routers, req.url);
  const styleObj = {};
  const promiseList = branch.map(({ route }) => {
    const { component } = route;
    if (component.getCssFile) {
      /**
       * 用于客户端维护style
       */
      styleObj[component.getCssFile] = `<link rel="stylesheet" href="/statics/css/${component.getCssFile}.css" >`;
    }
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
      const styleList = [];
      for (const styleId in styleObj) {
        if (styleObj.hasOwnProperty(styleId)) {
          styleList.push(styleObj[styleId]);
        }
      }

      res.end(
        tmpl({
          title: '',
          header: styleList.join('\n'),
          content,
          initialState: store.getState(),
          initialCss: styleObj
        })
      );
    })
    .catch(err => {
      console.log(err);
      res.end("didn\'t match any route. Check your url");
    });
}

export default render;