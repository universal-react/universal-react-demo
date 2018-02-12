/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Root from './container/root';

import configureStore from './store';

const store = configureStore(window.initialState);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./container/root/index.js', function () {
    // 使用更新过的 library 模块执行某些操作...
    const NewRoot = require('./container/root/index.js').default;
    ReactDOM.render(
      <Provider store={store}>
        <NewRoot />
      </Provider>,
      document.getElementById('app')
    );
  })
}