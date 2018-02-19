// client/routes.js
import importCss from 'babel-plugin-universal-import/importCss.js';
import * as React from 'react';
import universal from 'react-universal-component';

import Loading from './components/loading/container';
import AppRoot from './container/root';

// const load = props => Promise.all([
//   import(`./${props.page}`),
//   importCss(props.page)
// ]).then(proms => proms[0]);

// tslint:disable-next-line:variable-name
export const AsyncHome = universal(import('./container/home'), {
  resolve: () => require.resolveWeak('./container/home'),
  // chunkName: 'container/home',
  minDelay: 500,
  loading: Loading,
});

// tslint:disable-next-line:variable-name
export const AsyncProfile = universal(import('./container/profile'), {
  resolve: () => require.resolveWeak('./container/profile'),
  // chunkName: 'container/profile',
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
