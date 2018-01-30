'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduer = require('./container/home/reduer');

var _reduer2 = _interopRequireDefault(_reduer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  home: _reduer2.default
});

exports.default = rootReducer;