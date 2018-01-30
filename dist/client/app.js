'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _reactRouterConfig = require('react-router-config');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _routers = require('./routers');

var _routers2 = _interopRequireDefault(_routers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

var store = (0, _redux.createStore)(_reducer2.default, window.initialState, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default)));

console.log(store.getState());

var Main = _react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    (0, _reactRouterConfig.renderRoutes)(_routers2.default)
  )
);

exports.default = Main;