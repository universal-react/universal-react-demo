import * as React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config';

import routers from './routers';

export default () => (
  <BrowserRouter>
    {renderRoutes(routers)}
  </BrowserRouter>
);