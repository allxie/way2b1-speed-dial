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

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bubbleListItem = require('./bubble-list-item.prop-types');

var _bubbleListItem2 = _interopRequireDefault(_bubbleListItem);

var _bubbleListItem3 = require('./bubble-list-item.default-props');

var _bubbleListItem4 = _interopRequireDefault(_bubbleListItem3);

var _bubbleListItem5 = require('./bubble-list-item.styles');

var _bubbleListItem6 = _interopRequireDefault(_bubbleListItem5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class BubbleListItem
 */
var BubbleListItem = function (_React$Component) {
	(0, _inherits3.default)(BubbleListItem, _React$Component);

	/**
  * @param {Object} props - component props
  * @param {Object} muiTheme - the muiTheme in context
  * @returns {void}
  */
	function BubbleListItem(props, _ref) {
		var muiTheme = _ref.muiTheme;
		(0, _classCallCheck3.default)(this, BubbleListItem);

		var _this = (0, _possibleConstructorReturn3.default)(this, (BubbleListItem.__proto__ || (0, _getPrototypeOf2.default)(BubbleListItem)).call(this, props));

		_this.state = {
			isKeyboardFocused: false
		};

		_this.styles = (0, _bubbleListItem6.default)(muiTheme);
		_this.getStylesMain = _this.getStylesMain.bind(_this);
		_this.getStylesText = _this.getStylesText.bind(_this);
		_this.getStylesFocus = _this.getStylesFocus.bind(_this);
		_this.setFocus = _this.setFocus.bind(_this);
		_this.handleFocus = _this.handleFocus.bind(_this);
		_this.handleKeyUp = _this.handleKeyUp.bind(_this);
		_this.handleBlur = _this.handleBlur.bind(_this);
		return _this;
	}

	/**
  * @returns {void}
  */


	(0, _createClass3.default)(BubbleListItem, [{
		key: 'handleBlur',
		value: function handleBlur() {
			this.setState({
				isKeyboardFocused: false
			});
			this.props.onBlur();
		}

		/**
   * @returns {void}
   */

	}, {
		key: 'handleFocus',
		value: function handleFocus() {
			this.setState({
				isKeyboardFocused: true
			});
			this.props.onFocus();
		}

		/**
   * @param {Object} event - the keyUp event object
   * @returns {void}
   */

	}, {
		key: 'handleKeyUp',
		value: function handleKeyUp(event) {

			if (!this.state.isKeyboardFocused || event.keyCode !== 13) {
				return;
			}

			var _props = this.props,
			    onTouchTap = _props.onTouchTap,
			    onClick = _props.onClick;


			(onTouchTap || onClick)(event);
		}

		/**
   * @returns {void}
   */

	}, {
		key: 'setFocus',
		value: function setFocus() {
			this.refs.link.focus();
		}

		/**
   * @returns {Object} styles for root element
   */

	}, {
		key: 'getStylesMain',
		value: function getStylesMain() {
			var _props2 = this.props,
			    isOpen = _props2.isOpen,
			    direction = _props2.direction,
			    alignment = _props2.alignment;

			var styles = this.styles;
			var visibleStr = isOpen ? 'visible' : 'invisible';
			return (0, _simpleAssign2.default)({}, styles.root.main, styles.root[visibleStr].main, styles.root.direction[direction], styles.root[visibleStr].direction[direction], styles.root.alignment[alignment]);
		}

		/**
   * @param {string} elementName - the element name eg. (avatar|text)
   * @returns {Object} styles for focused element
   */

	}, {
		key: 'getStylesFocus',
		value: function getStylesFocus(elementName) {
			var isKeyboardFocused = this.state.isKeyboardFocused;


			if (!isKeyboardFocused) {
				return {};
			}

			return this.styles.focus[elementName];
		}

		/**
   * @returns {Object} styles for text element
   */

	}, {
		key: 'getStylesText',
		value: function getStylesText() {
			var alignment = this.props.alignment;

			var styles = this.styles;

			return (0, _simpleAssign2.default)({}, styles.text.main, styles.text.alignment[alignment], this.getStylesFocus('text'));
		}

		/**
   * @param {string} name - the name in styles eg. (rightAvatar|leftAvatar)
   * @returns {XML} returns the cloned Avatar
   */

	}, {
		key: 'renderAvatar',
		value: function renderAvatar(name) {

			var styles = this.styles;
			var avatar = this.props[name];

			if (!avatar) {
				return null;
			}

			return _react2.default.cloneElement(avatar, {
				style: (0, _simpleAssign2.default)({}, avatar.props.style, styles[name], this.getStylesFocus('avatar'))
			});
		}

		/**
   * @returns {XML} returns the content
   */

	}, {
		key: 'renderContent',
		value: function renderContent() {
			var primaryText = this.props.primaryText;

			var content = _react2.default.createElement(
				'span',
				{ style: this.getStylesText() },
				primaryText
			);

			return _react2.default.createElement(
				'span',
				null,
				this.renderAvatar('leftAvatar'),
				content,
				this.renderAvatar('rightAvatar')
			);
		}

		/**
   * @returns {XML} returns the link
   */

	}, {
		key: 'renderLink',
		value: function renderLink() {
			var _props3 = this.props,
			    href = _props3.href,
			    onTouchTap = _props3.onTouchTap,
			    onClick = _props3.onClick,
			    tabIndex = _props3.tabIndex,
			    isOpen = _props3.isOpen;

			var styles = this.styles;

			if (href) {
				return _react2.default.createElement(
					'a',
					{
						href: href,
						ref: 'link',
						style: styles.wrap.main,
						tabIndex: isOpen ? tabIndex : -1,
						onBlur: this.handleBlur,
						onFocus: this.handleFocus
					},
					this.renderContent()
				);
			}

			return _react2.default.createElement(
				'a',
				{
					ref: 'link',
					style: styles.wrap.main,
					tabIndex: isOpen ? tabIndex : -1,
					onBlur: this.handleBlur,
					onFocus: this.handleFocus,
					onKeyUp: this.handleKeyUp,
					onTouchTap: onTouchTap || onClick
				},
				this.renderContent()
			);
		}

		/**
   * @returns {XML} returns the component
   */

	}, {
		key: 'render',
		value: function render() {
			var className = this.props.className;


			return _react2.default.createElement(
				'li',
				{
					className: className,
					ref: 'item',
					style: this.getStylesMain()
				},
				this.renderLink()
			);
		}
	}]);
	return BubbleListItem;
}(_react2.default.Component);

BubbleListItem.displayName = 'BubbleListItem';
process.env.NODE_ENV !== "production" ? BubbleListItem.propTypes = _bubbleListItem2.default : void 0;
BubbleListItem.defaultProps = _bubbleListItem4.default;
BubbleListItem.contextTypes = {
	muiTheme: _react2.default.PropTypes.object.isRequired
};
exports.default = BubbleListItem;