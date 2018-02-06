// client/routes.js
import React from 'react';
import asyncComponent from './utils/async-component';

import AppRoot from './container/root';
// import Home from './container/home';
const AsyncHome = asyncComponent(() => System.import('./container/home' /* webpackChunkName:"home" */).then(module => module.default));

import Profile from './container/profile';

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
    component: Profile
  }
];

export default routes;