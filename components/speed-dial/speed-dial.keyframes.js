'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getCssKeyFramesClosing = exports.getCssKeyFrames = undefined;

var _createKeyframes = require('./create-keyframes');

var _createKeyframes2 = _interopRequireDefault(_createKeyframes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @returns {number} - the window width or maxWidth
 * @private
 */
function _getWidth() {
	return Number(window.innerWidth <= 1024 ? window.innerWidth : 1024);
}

var getCssKeyFrames = exports.getCssKeyFrames = function getCssKeyFrames(className, key, _ref) {
	var height = _ref.height,
	    btnHeight = _ref.btnHeight,
	    positionH = _ref.positionH;


	var width = _getWidth();
	var translateY = Number(height / 2) + 'px';
	var translateX = width / 2 - btnHeight + 'px';
	var translateClosed = '0px,0px';
	var translatePartA = '0px,' + translateY;
	var translateScale = width / 40;
	var translateOpened = '0px,0px';

	if (positionH === 'left') {
		translateOpened = translateX + ',' + translateY;
	} else {
		translateOpened = '-' + translateX + ',' + translateY;
	}

	return (0, _createKeyframes2.default)({
		className: className + key,
		name: className + key,
		iterationCount: 1
	}, {
		'0%': {
			translate: translateClosed,
			scaleX: 1,
			scaleY: 1
		},
		'20%': {
			translate: translatePartA,
			scaleX: 1,
			scaleY: 1
		},
		'40%': {
			translate: translateOpened,
			scaleX: translateScale / 2,
			scaleY: translateScale / 2
		},
		'100%': {
			translate: translateOpened,
			scaleX: translateScale,
			scaleY: translateScale
		}
	});
};

var getCssKeyFramesClosing = exports.getCssKeyFramesClosing = function getCssKeyFramesClosing(className, key, _ref2) {
	var height = _ref2.height,
	    btnHeight = _ref2.btnHeight,
	    positionH = _ref2.positionH;


	var width = _getWidth();
	var translateY = Number(height / 2) + 'px';
	var translateX = width / 2 - btnHeight + 'px';
	var translateClosed = '0px,0px';
	var translatePartA = '0px,' + translateY;
	var translateScale = width / 40;
	var translateOpened = '0px,0px';

	if (positionH === 'left') {
		translateOpened = translateX + ',' + translateY;
	} else {
		translateOpened = '-' + translateX + ',' + translateY;
	}

	return (0, _createKeyframes2.default)({
		className: className + key,
		name: className + key,
		iterationCount: 1
	}, {
		'0%': {
			translate: translateOpened,
			scaleX: translateScale,
			scaleY: translateScale
		},
		'20%': {
			translate: translatePartA,
			scaleX: translateScale / 2,
			scaleY: translateScale / 2
		},
		'40%': {
			translate: translateClosed,
			scaleX: 1,
			scaleY: 1
		},
		'100%': {
			translate: translateClosed,
			scaleX: 1,
			scaleY: 1
		}
	});
};