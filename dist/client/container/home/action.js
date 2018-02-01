'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserList = exports.toogleBlankVisible = exports.UPDATE_USER_LIST = exports.TOOGLE_BLANK_VISIBLE = undefined;

var _xhrRequest = require('xhr-request');

var _xhrRequest2 = _interopRequireDefault(_xhrRequest);

var _action = require('../../components/error/action');

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOOGLE_BLANK_VISIBLE = exports.TOOGLE_BLANK_VISIBLE = 'TOOGLE_BLANK_VISIBLE';

var UPDATE_USER_LIST = exports.UPDATE_USER_LIST = 'UPDATE_USER_LIST';

var toogleBlankVisible = exports.toogleBlankVisible = function toogleBlankVisible() {
  return function (dispatch, getState) {
    var blankVisible = getState().home.blankVisible;


    dispatch({
      type: TOOGLE_BLANK_VISIBLE,
      payload: !blankVisible
    });
  };
};

/**
 * return Promise
 * https://stackoverflow.com/questions/36189448/want-to-do-dispatch-then
 */
var getUserList = exports.getUserList = function getUserList() {
  return function (dispath, getState) {
    return new Promise(function (resolve, reject) {
      (0, _xhrRequest2.default)('http://localhost:8388/user/list', {
        json: true
      }, function (err, data) {
        if (err) {
          dispath({
            type: _action2.default,
            payload: err
          });
          reject(err);
        } else {
          dispath({
            type: UPDATE_USER_LIST,
            payload: data.list
          });
          resolve(data);
        }
      });
    });
  };
};