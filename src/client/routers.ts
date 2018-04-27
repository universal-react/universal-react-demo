/* eslint-disable */
// client/routes.js
import * as React from 'react';
import universal from 'react-universal-component';
import importCss from 'babel-plugin-universal-import/importCss.js'

import AppRoot from './container/root';

// 由于 ts-node/register 无法使用 babel-plugin-universal-import 所以我们需要将 babel-plugin-universal-import 转换后的代码明写出来
// 实际上这个 plugin 只是在 babylon 处理 import 语法之前处理 import 语法

// TODO
// const load = props => {
//   console.log(props);
//   return Promise.all([
//     import('./container/home'),
//     importCss('./container/home/home.css')
//   ]).then(proms => proms[0]);
// }

const UniversalHome = universal(() => import('./container/home'), {
  resolve: () => require.resolveWeak('./container/home'),
  chunkName: 'container/home',
  minDelay: 500,
});

// const UniversalHome = universal(load, {
//   resolve: () => require.resolveWeak('./container/home'),
//   chunkName: 'container/home',
//   minDelay: 500,
// });

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