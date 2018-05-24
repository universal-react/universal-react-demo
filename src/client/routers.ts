/* tslint:disable variable-name ordered-imports max-line-length */
const importCss = require('babel-plugin-universal-import/importCss.js');
const universalImport = require('babel-plugin-universal-import/universalImport.js');

import * as React from 'react';
import * as path from 'path';
import universal from 'react-universal-component';
import AppRoot from './container/root';

/**
 * 由于 ts-node/register 无法使用 babel-plugin-universal-import
 * 所以我们需要将 babel-plugin-universal-import 转换后的代码明写出来
 * 实际上这个 plugin 只是在 babylon 处理 import 语法之前处理 import 语法
 */

// const UniversalHome = universal(() => import('./container/home'), {
//   resolve: () => require.resolveWeak('./container/home'),
//   chunkName: 'container/home',
//   minDelay: 500,
// });

const UniversalHome = universal(universalImport({
  chunkName: () => 'container/home',
  path: () => path.join(__dirname, './container/home'),
  resolve: () => require.resolveWeak('./container/home'),
  load: () => Promise.all([
    import('./container/home'),
    importCss('container/home')
  ]).then(proms => proms[0])
}));

const UniversalProfile = universal(universalImport({
  chunkName: () => 'container/profile',
  path: () => path.join(__dirname, './container/profile'),
  resolve: () => require.resolveWeak('./container/profile'),
  load: () => Promise.all([
    import('./container/profile'),
  ]).then(proms => proms[0])
}));

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
