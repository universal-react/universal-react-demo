import ReactDOM from 'react-dom';
import React from 'react';
import Main from './app';

import initialStore from './store';

ReactDOM.render(Main, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./app', () => {
    const NewApp = require('./app').default;
    ReactDOM.render(NewApp, document.getElementById('app'));
  });
}