'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

exports.default = {
	children: _react.PropTypes.any,
	className: _react.PropTypes.string,
	classNameBackdrop: _react.PropTypes.string,
	classNameButtonWrap: _react.PropTypes.string,
	classNameInTransition: _react.PropTypes.string,
	classNameOpen: _react.PropTypes.string,
	closeOnSecondClick: _react.PropTypes.bool,
	closeOnScrollDown: _react.PropTypes.bool,
	closeOnScrollUp: _react.PropTypes.bool,
	floatingActionButtonProps: _react.PropTypes.shape({
		backgroundColor: _react.PropTypes.string,
		className: _react.PropTypes.string,
		disabled: _react.PropTypes.bool,
		iconClassName: _react.PropTypes.string,
		iconStyle: _react.PropTypes.object,
		mini: _react.PropTypes.bool,
		secondary: _react.PropTypes.bool,
		style: _react.PropTypes.object,
		zDepth: _react.PropTypes.number
	}),
	hasBackdrop: _react.PropTypes.bool,
	icon: _react.PropTypes.object,
	iconOpen: _react.PropTypes.object,
	isInitiallyOpen: _react.PropTypes.bool,
	positionH: _react.PropTypes.string,
	positionV: _react.PropTypes.string,
	primaryText: _react.PropTypes.string,
	style: _react.PropTypes.object,
	styleBackdrop: _react.PropTypes.object,
	styleButtonWrap: _react.PropTypes.object,
	tabIndex: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	toolbox: _react.PropTypes.shape({
		height: _react.PropTypes.number.isRequired,
		className: _react.PropTypes.string,
		classNameMorphButton: _react.PropTypes.string
	}),
	onClickPrimaryButton: _react.PropTypes.func,
	onChangeState: _react.PropTypes.func
};