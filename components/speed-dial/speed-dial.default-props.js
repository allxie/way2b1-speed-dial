'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _add = require('material-ui/svg-icons/content/add');

var _add2 = _interopRequireDefault(_add);

var _close = require('material-ui/svg-icons/navigation/close');

var _close2 = _interopRequireDefault(_close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	closeOnSecondClick: true,
	closeOnScrollDown: false,
	closeOnScrollUp: false,
	hasBackdrop: true,
	icon: _react2.default.createElement(_add2.default, null),
	iconOpen: _react2.default.createElement(_close2.default, null),
	isInitiallyOpen: false,
	positionH: 'right',
	positionV: 'bottom',
	style: {},
	styleBackdrop: {},
	styleButtonWrap: {},
	tabIndex: 1,
	onClickPrimaryButton: function onClickPrimaryButton() {},
	onChangeState: function onChangeState() {}
};