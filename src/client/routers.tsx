// client/routes.js
import * as React from 'react';
import universal from 'react-universal-component'
import AppRoot from './container/root';
import Loading from './components/loading/container';

export const AsyncHome = universal(() => import('./container/home'), {
  resolve: () => require.resolveWeak('./container/home'),
  chunkName: 'container/home',
  minDelay: 500,
  loading: Loading,
});

export const AsyncProfile = universal(() => import('./container/profile'), {
  resolve: () => require.resolveWeak('./container/profile'),
  chunkName: 'container/profile',
  minDelay: 500,
  loading: Loading,
});

const routes = [
  {
    path: '/',
    exact: true,
    component: AppRoot
  },
  {
    path: '/home',
    component: AsyncHome,
  },
  {
    path: '/profile',
    component: AsyncProfile
  }
];

export default routes;