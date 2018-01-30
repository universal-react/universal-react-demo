'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _st = require('st');

var _st2 = _interopRequireDefault(_st);

var _server = require('react-dom/server');

var _reactRouterConfig = require('react-router-config');

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _routers = require('../client/routers');

var _routers2 = _interopRequireDefault(_routers);

var _store = require('../client/store');

var _store2 = _interopRequireDefault(_store);

var _tmpl = require('./utils/tmpl');

var _user = require('./api/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOTPATH = _path2.default.resolve('./');
var PORT = 8388;

var store = (0, _store2.default)();

var staticsService = (0, _st2.default)({ url: '/statics', path: _path2.default.join(ROOTPATH, 'dist') });

var serve = _http2.default.createServer(function (req, res) {
  var stHandled = staticsService(req, res);
  if (stHandled) return;
  if (req.url === '/user/list') {
    (0, _user.userList)(req, res);
  } else {
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
    console.log(styleList);
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
      console.log(content);
      res.end((0, _tmpl.tmpl)({
        title: '',
        header: styleList.join('\n'),
        content: content,
        initialState: store.getState()
      }));
    });
  }
});

serve.listen(PORT, function () {
  console.log('server start on port ' + PORT);
});

exports.default = serve;