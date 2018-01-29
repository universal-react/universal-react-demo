// client/routes.js

import AppRoot from './container/root';
import Home from './container/home';
import Profile from './container/profile';

const routes = [
  {
    path: '/',
    exact: true,
    component: AppRoot
  },
  {
    path: '/home',
    component: Home,
    loadData: Home.getInitialData,
  },
  {
    path: '/profile',
    component: Profile
  }
];

export default routes;