'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _root = require('./container/root');

var _root2 = _interopRequireDefault(_root);

var _home = require('./container/home');

var _home2 = _interopRequireDefault(_home);

var _profile = require('./container/profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  path: '/',
  exact: true,
  component: _root2.default
}, {
  path: '/home',
  component: _home2.default,
  loadData: _home2.default.getInitialData
}, {
  path: '/profile',
  component: _profile2.default
}]; // client/routes.js

exports.default = routes;