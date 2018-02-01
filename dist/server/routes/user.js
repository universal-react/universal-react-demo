'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router({
  caseSensitive: true
});

userRouter.get('/list', function (req, res, next) {
  res.json({ list: [{ name: 'bob' }, { name: 'John' }] }).end();
});

exports.default = userRouter;