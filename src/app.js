import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import initialStore from './store';
import routers from './routers';

const Main = (
  <Provider store={initialStore(window.__INITIAL_STATE__)}>
    <BrowserRouter>
      {renderRoutes(routers)}
    </BrowserRouter>
  </Provider>
);

export default Main;