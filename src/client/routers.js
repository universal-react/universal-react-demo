// client/routes.js
import * as React from 'react';
import universal from 'react-universal-component';

import AppRoot from './container/root';

const UniversalHome = universal(() => import('./container/home'), {
  resolve: () => require.resolveWeak('./container/home'),
  chunkName: 'container/home',
  minDelay: 500,
});

const UniversalProfile = universal(() => import('./container/profile'), {
  resolve: () => require.resolveWeak('./container/profile'),
  chunkName: 'container/profile',
  minDelay: 500,
});

const routes = [
  {
    path: '/',
    exact: true,
    component: AppRoot
  },
  {
    path: '/home',
    component: UniversalHome,
  },
  {
    path: '/profile',
    component: UniversalProfile,
  }
];

export default routes;
