import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import rootReducer from './reducer';
import routers from './routers';

import initialStore from './store';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = initialStore(window.initialState, composeEnhancers(applyMiddleware(thunk)));

console.log(store.getState());

const Main = (
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routers)}
    </BrowserRouter>
  </Provider>
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducer', () => {
    const nextRootReducer = require('./reducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default Main;