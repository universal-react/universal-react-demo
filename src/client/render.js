/* eslint-env browser */

import App from './app';
import configureStore from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

const store = configureStore(window.initialState);

window.dev = { store };

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./app.js', function () {
    // 使用更新过的 library 模块执行某些操作...
    const NewApp = require('./app').default;
    ReactDOM.hydrate(
      <Provider store={store}>
        <NewApp />
      </Provider>,
      document.getElementById('app')
    );
  })
}