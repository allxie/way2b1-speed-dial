'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bubbleList = require('./bubble-list.styles');

var _bubbleList2 = _interopRequireDefault(_bubbleList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} child - the child component or node
 * @param {string} displayName - the displayName
 * @returns {boolean} returns true if child is component with given displayName
 */
function isValidChild(child, displayName) {
	return child !== null && (typeof child === 'undefined' ? 'undefined' : (0, _typeof3.default)(child)) === 'object' && !(child instanceof Array) && child.type && child.type.displayName === displayName;
}

/**
 * Class BubbleList
 */

var BubbleList = function (_React$Component) {
	(0, _inherits3.default)(BubbleList, _React$Component);

	/**
  * @param {Object} props - component props
  * @param {Object} muiTheme - the muiTheme in context
  * @returns {void}
  */
	function BubbleList(props, _ref) {
		var muiTheme = _ref.muiTheme;
		(0, _classCallCheck3.default)(this, BubbleList);

		var _this = (0, _possibleConstructorReturn3.default)(this, (BubbleList.__proto__ || (0, _getPrototypeOf2.default)(BubbleList)).call(this, props));

		_this.styles = (0, _bubbleList2.default)(muiTheme);
		_this.getStylesMain = _this.getStylesMain.bind(_this);
		_this.renderChild = _this.renderChild.bind(_this);
		return _this;
	}

	/**
  * @returns {Object} styles for root element
  */


	(0, _createClass3.default)(BubbleList, [{
		key: 'getStylesMain',
		value: function getStylesMain() {
			var _props = this.props,
			    isOpen = _props.isOpen,
			    _props$direction = _props.direction,
			    direction = _props$direction === undefined ? 'up' : _props$direction,
			    _props$alignment = _props.alignment,
			    alignment = _props$alignment === undefined ? 'right' : _props$alignment,
			    _props$positionV = _props.positionV,
			    positionV = _props$positionV === undefined ? 'bottom' : _props$positionV;

			var styles = this.styles;
			var visibleStr = isOpen ? 'visible' : 'invisible';
			return (0, _simpleAssign2.default)({}, styles.root.main, styles.root[visibleStr].main, styles.root.direction[direction], styles.root.direction[direction + '_' + positionV], styles.root.alignment[alignment]);
		}

		/**
   * @param {XML|Object} child - the child component
   * @param {string|undefined} child.type - the child component type
   * @param {string|undefined} child.type.displayName - the child component displayName
   * @param {number} index - the child index
   * @returns {XML} returns the cloned child component
   */

	}, {
		key: 'renderChild',
		value: function renderChild(child, index) {
			var _props2 = this.props,
			    isOpen = _props2.isOpen,
			    isInTransition = _props2.isInTransition,
			    _props2$direction = _props2.direction,
			    direction = _props2$direction === undefined ? 'up' : _props2$direction,
			    _props2$alignment = _props2.alignment,
			    alignment = _props2$alignment === undefined ? 'right' : _props2$alignment;


			if (!isValidChild(child, 'BubbleListItem')) {
				return child;
			}

			return _react2.default.cloneElement(child, {
				key: index,
				isOpen: isOpen,
				isInTransition: isInTransition,
				alignment: alignment,
				direction: direction,
				ref: 'listItem' + index
			});
		}

		/**
   * @returns {XML|Array} returns the children component's
   */

	}, {
		key: 'renderChildren',
		value: function renderChildren() {
			var children = this.props.children;


			if (!children) {
				return _react2.default.createElement('ul', { style: this.getStylesMain() });
			}

			if (!isValidChild(children, 'BubbleListItem')) {
				if (children instanceof Array) {
					return children.map(this.renderChild);
				}
				return children;
			}

			return this.renderChild(children, 0);
		}

		/**
   * @returns {XML} returns the component
   */

	}, {
		key: 'render',
		value: function render() {
			var className = this.props.className;


			return _react2.default.createElement(
				'ul',
				{ className: className, style: this.getStylesMain() },
				this.renderChildren()
			);
		}
	}]);
	return BubbleList;
}(_react2.default.Component);

BubbleList.displayName = 'BubbleList';
process.env.NODE_ENV !== "production" ? BubbleList.propTypes = {
	alignment: _react2.default.PropTypes.string,
	children: _react2.default.PropTypes.any,
	className: _react2.default.PropTypes.string,
	direction: _react2.default.PropTypes.string,
	isInTransition: _react2.default.PropTypes.bool,
	isOpen: _react2.default.PropTypes.bool,
	positionV: _react2.default.PropTypes.string
} : void 0;
BubbleList.defaultProps = {
	isOpen: false,
	isInTransition: false
};
BubbleList.contextTypes = {
	muiTheme: _react2.default.PropTypes.object.isRequired
};

exports.default = BubbleList;