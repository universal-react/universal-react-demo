'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRedux = require('react-redux');

var _reactRouterConfig = require('react-router-config');

var _reactRouterDom = require('react-router-dom');

var _routers = require('../client/routers');

var _routers2 = _interopRequireDefault(_routers);

var _store = require('../client/store');

var _store2 = _interopRequireDefault(_store);

var _tmpl = require('./utils/tmpl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// lib
function render(req, res, next) {
  var store = (0, _store2.default)();
  var dispatch = store.dispatch;

  var branch = (0, _reactRouterConfig.matchRoutes)(_routers2.default, req.url);
  var styleList = [];
  var promiseList = branch.map(function (_ref) {
    var route = _ref.route;
    var component = route.component;

    if (component.getCssFile) {
      styleList.push('<link rel="stylesheet" href="/statics/css/' + component.getCssFile + '.css" >');
    }
    return route.component.getInitialData ? route.component.getInitialData(dispatch) : Promise.resolve();
  });

  Promise.all(promiseList).then(function (v) {
    var content = (0, _server.renderToString)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouterDom.StaticRouter,
        { location: req.url, context: {} },
        (0, _reactRouterConfig.renderRoutes)(_routers2.default)
      )
    ));

    res.end((0, _tmpl.tmpl)({
      title: '',
      header: styleList.join('\n'),
      content: content,
      initialState: store.getState()
    }));
  }).catch(function (err) {
    console.log(err);
    res.end("didn\'t match any route. Check your url");
  });
}
// template function return string

// user config
exports.default = render;