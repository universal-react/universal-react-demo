'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _action = require('./action');

var initialState = {
  list: [],
  blankVisible: true
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _action.UPDATE_USER_LIST:
      return _extends({}, state, {
        list: action.payload
      });
      break;
    case _action.TOOGLE_BLANK_VISIBLE:
      return _extends({}, state, {
        blankVisible: action.payload
      });
      break;
    default:
      return state;
      break;
  }
};