/* eslint-env browser */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';

import App from './app';

const store = configureStore(window.initialState);

ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./app.tsx', () => {
    // 使用更新过的 library 模块执行某些操作...
    // tslint:disable-next-line:variable-name
    const NewApp = require('./app').default;
    ReactDOM.render(
      <Provider store={store}>
        <NewApp />
      </Provider>,
      document.getElementById('app')
    );
  });
}
