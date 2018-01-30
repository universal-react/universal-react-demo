'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _xhrRequest = require('xhr-request');

var _xhrRequest2 = _interopRequireDefault(_xhrRequest);

var _action = require('./action');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// component.js
var styles = {
  'red': 'home__red___szqq9'
};


var Home = function Home(props) {
  var list = props.list,
      blankVisible = props.blankVisible,
      dispatch = props.dispatch;

  var userListDOM = list.map(function (v, i) {
    return _react2.default.createElement(
      'p',
      { key: i },
      'name: ',
      v.name
    );
  });
  return _react2.default.createElement(
    'div',
    { className: styles.red },
    'Hello world',
    _react2.default.createElement(
      'div',
      null,
      userListDOM
    ),
    _react2.default.createElement(
      'button',
      { onClick: function onClick() {
          return dispatch((0, _action.toogleBlankVisible)());
        } },
      'toggle blank'
    ),
    blankVisible ? _react2.default.createElement(
      'div',
      { className: styles.blank },
      'blank'
    ) : null
  );
};

Home.getCssFile = 'home';

Home.getInitialData = function (dispatch) {
  return dispatch((0, _action.getUserList)());
};

var mapState2Props = function mapState2Props(store) {
  return _extends({}, store.home);
};

var mapDispatch2Props = function mapDispatch2Props(dispatch) {
  return {
    getUserList: _action.getUserList,
    toogleBlankVisible: _action.toogleBlankVisible
  };
};

exports.default = (0, _reactRedux.connect)(mapState2Props)(Home);