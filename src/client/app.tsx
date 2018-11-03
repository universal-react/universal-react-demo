import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

import routers from './routers';

export default () => (
  <BrowserRouter>
    {renderRoutes(routers)}
  </BrowserRouter>
);
