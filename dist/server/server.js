'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _webpack3 = require('../../webpack/webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _tmpl = require('./utils/tmpl');

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var DISTDIR = _path2.default.join(__dirname, '../../dist');
var PORT = 8388;

app.use(_express2.default.static(DISTDIR));
app.use('/statics', _express2.default.static(DISTDIR));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/user', _user2.default);

app.get('*', _render2.default);

var serve = _http2.default.createServer(app);
serve.listen(PORT, function () {
  console.log('server start on port ' + PORT);
});

exports.default = serve;