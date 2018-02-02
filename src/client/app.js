import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routers from './routers';

const Main = () => (
  <BrowserRouter>
    {renderRoutes(routers)}
  </BrowserRouter>
);

export default Main;