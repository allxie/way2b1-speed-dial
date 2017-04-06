'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _FloatingActionButton = require('material-ui/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _colors = require('material-ui/styles/colors');

var _bubbleListItem = require('../bubble-list-item/bubble-list-item.js');

var _bubbleListItem2 = _interopRequireDefault(_bubbleListItem);

var _speedDial = require('./speed-dial.prop-types');

var _speedDial2 = _interopRequireDefault(_speedDial);

var _speedDial3 = require('./speed-dial.default-props');

var _speedDial4 = _interopRequireDefault(_speedDial3);

var _speedDial5 = require('./speed-dial.styles');

var _speedDial6 = _interopRequireDefault(_speedDial5);

var _speedDial7 = require('./speed-dial.keyframes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animTime = 450;
var keyFrameClassName = 'anim-btn-morph';
var keyFrameClosingClassName = 'anim-btn-morph-closing';

/**
 * @returns {number} returns the scroll top distance
 */
function scrollTop() {
	return document.body.scrollTop || document.documentElement.scrollTop;
}

/**
 * @param {Object} child - the child component or node
 * @param {string} displayName - the displayName
 * @returns {boolean} returns true if child is component with given displayName
 */
function isValidChild(child, displayName) {
	return child !== null && (typeof child === 'undefined' ? 'undefined' : (0, _typeof3.default)(child)) === 'object' && !(child instanceof Array) && child.type && child.type.displayName === displayName;
}

/**
 * Class SpeedDial
 */

var SpeedDial = function (_React$Component) {
	(0, _inherits3.default)(SpeedDial, _React$Component);

	/**
  * @param {Object} props - component props
  * @param {Object} context - component context
  * @returns {void}
  */
	function SpeedDial(props, context) {
		(0, _classCallCheck3.default)(this, SpeedDial);

		var _this = (0, _possibleConstructorReturn3.default)(this, (SpeedDial.__proto__ || (0, _getPrototypeOf2.default)(SpeedDial)).call(this, props, context));

		_this.state = {
			isOpen: props.isInitiallyOpen,
			isInTransition: false,
			wasOpened: !props.isInitiallyOpen,
			isBackdropFocused: false,
			openedScrollPos: 0
		};

		_this.instanceKey = String(Math.random() * 10000).substring(0, 4);

		_this.getStylesBackdrop = _this.getStylesBackdrop.bind(_this);
		_this.isChildrenBubbleList = _this.isChildrenBubbleList.bind(_this);
		_this.isToolbox = _this.isToolbox.bind(_this);
		_this.handleClickOpen = _this.handleClickOpen.bind(_this);
		_this.handleClickClose = _this.handleClickClose.bind(_this);
		_this.handleClickCloseToolbox = _this.handleClickCloseToolbox.bind(_this);
		_this.handleClickBackdrop = _this.handleClickBackdrop.bind(_this);
		_this.handleFocusFirstListItem = _this.handleFocusFirstListItem.bind(_this);
		_this.handleFocusPrimaryText = _this.handleFocusPrimaryText.bind(_this);
		_this.handleFocusBackdrop = _this.handleFocusBackdrop.bind(_this);
		_this.handleBlurBackdrop = _this.handleBlurBackdrop.bind(_this);
		_this.handleBackdropKeyUp = _this.handleBackdropKeyUp.bind(_this);
		_this.handleScroll = _this.handleScroll.bind(_this);
		_this.styles = (0, _speedDial6.default)(context.muiTheme);

		return _this;
	}

	/**
  * @returns {void}
  */


	(0, _createClass3.default)(SpeedDial, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    closeOnScrollDown = _props.closeOnScrollDown,
			    closeOnScrollUp = _props.closeOnScrollUp;


			if (closeOnScrollDown === true || closeOnScrollUp === true) {
				window.addEventListener('scroll', this.handleScroll);
			}
		}

		/**
   * @returns {void}
   */

	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var _props2 = this.props,
			    closeOnScrollDown = _props2.closeOnScrollDown,
			    closeOnScrollUp = _props2.closeOnScrollUp;


			if (closeOnScrollDown === true || closeOnScrollUp === true) {
				window.removeEventListener('scroll', this.handleScroll);
			}
		}

		/**
   * @returns {void}
   */

	}, {
		key: 'handleScroll',
		value: function handleScroll() {
			var _props3 = this.props,
			    closeOnScrollDown = _props3.closeOnScrollDown,
			    closeOnScrollUp = _props3.closeOnScrollUp;
			var _state = this.state,
			    isOpen = _state.isOpen,
			    openedScrollPos = _state.openedScrollPos;


			if (isOpen) {
				var distance = Number(scrollTop() || 0) - openedScrollPos;
				if (closeOnScrollDown === true && distance >= 30) {
					this.handleClickClose();
				}
				if (closeOnScrollUp === true && distance <= -30) {
					this.handleClickClose();
				}
			}
		}

		/**
   * @returns {void}
   */

	}, {
		key: 'handleFocusFirstListItem',
		value: function handleFocusFirstListItem() {
			if (!this.refs.list || !this.refs.list.refs || !this.refs.list.refs.listItem0) {
				return;
			}

			this.refs.list.refs.listItem0.setFocus();
		}

		/**
   * @returns {void}
   */

	}, {
		key: 'handleClickOpen',
		value: function handleClickOpen() {
			var _this2 = this;

			this.updateState({
				wasOpened: false,
				isOpen: true,
				isInTransition: true,
				openedScrollPos: scrollTop()
			});

			/* istanbul ignore next */
			setTimeout(function () {
				_this2.updateState({
					wasOpened: false,
					isInTransition: false
				});
				_this2.handleFocusFirstListItem();
			}, animTime);
		}

		/**
   * @returns {void}
   */

	}, {
		key: 'handleClickClose',
		value: function handleClickClose() {
			var _this3 = this;

			this.props.onClickPrimaryButton();

			if (this.props.closeOnSecondClick) {
				this.updateState({
					wasOpened: true,
					isOpen: false,
					isInTransition: true
				});
			}

			/* istanbul ignore next */
			setTimeout(function () {
				_this3.updateState({
					wasOpened: false,
					isInTransition: false
				});
			}, animTime);
		}

		/**
   * @returns {void}
   */

	}, {
		key: 'handleClickCloseToolbox',
		value: function handleClickCloseToolbox() {
			var _this4 = this;

			/* istanbul ignore next */
			this.updateState({
				wasOpened: true,
				isOpen: false,
				isInTransition: true
			});

			/* istanbul ignore next */
			setTimeout(function () {
				_this4.updateState({
					wasOpened: false,
					isInTransition: false
				});
			}, animTime);
		}

		/**
   * @returns {void}
   */

	}, {
		key: 'handleClickBackdrop',
		value: function handleClickBackdrop() {
			var _this5 = this;

			/* istanbul ignore next */
			this.updateState({
				isOpen: false,
				isInTransition: true
			});

			/* istanbul ignore next */
			setTimeout(function () {
				_this5.updateState({
					isInTransition: false
				});
			}, animTime);
		}

		/**
   * @returns {void}
   */

	}, {
		key: 'handleFocusPrimaryText',
		value: function handleFocusPrimaryText() {
			this.refs.btn.refs.container.refs.enhancedButton.focus();
		}

		/**
   * @returns {void}
   */

	}, {
		key: 'handleFocusBackdrop',
		value: function handleFocusBackdrop() {
			this.updateState({
				isBackdropFocused: true
			});
		}

		/**
   * @returns {void}
   */

	}, {
		key: 'handleBlurBackdrop',
		value: function handleBlurBackdrop() {
			this.updateState({
				isBackdropFocused: false
			});
		}

		/**
   * @param {Object} event - the backdrop keyUp event
   * @returns {void}
   */

	}, {
		key: 'handleBackdropKeyUp',
		value: function handleBackdropKeyUp(event) {
			if (event.keyCode !== 13) {
				return;
			}

			this.handleClickBackdrop();
		}

		/**
   * @returns {string} transitionState (open|closed|opening|closing)
   */

	}, {
		key: 'getCurrentTransitionState',
		value: function getCurrentTransitionState() {
			var _state2 = this.state,
			    isOpen = _state2.isOpen,
			    isInTransition = _state2.isInTransition,
			    wasOpened = _state2.wasOpened;


			if (!isInTransition) {
				return isOpen ? 'open' : 'closed';
			}

			if (isOpen && !wasOpened) {
				return 'opening';
			}

			return 'closing';
		}

		/**
   * @returns {string} the BubbleList direction
   */

	}, {
		key: 'getDirection',
		value: function getDirection() {
			var _props4 = this.props,
			    children = _props4.children,
			    positionV = _props4.positionV;


			if (children && children.props && children.props.direction) {
				return children.props.direction;
			}

			return positionV === 'bottom' ? 'up' : 'down';
		}

		/**
   * @returns {string} the BubbleList alignment
   */

	}, {
		key: 'getAlignment',
		value: function getAlignment() {
			var _props5 = this.props,
			    children = _props5.children,
			    positionH = _props5.positionH;


			if (children && children.props && children.props.alignment) {
				return children.props.alignment;
			}

			return positionH;
		}

		/**
   * @returns {Object} the `ActionButton`
   */

	}, {
		key: 'getActionButton',
		value: function getActionButton() {
			try {
				return this.refs.btn.refs.container;
			} catch (err) {
				return {};
			}
		}

		/**
   * @returns {Object} the `ActionButton` style object
   */

	}, {
		key: 'getActionButtonStyles',
		value: function getActionButtonStyles() {
			try {
				return (0, _simpleAssign2.default)({}, this.getActionButton().refs.enhancedButton.style);
			} catch (err) {
				return {};
			}
		}

		/**
   * @returns {Object} merged styles for the `FloatingActionButton`
   */

	}, {
		key: 'getStylesBtn',
		value: function getStylesBtn() {
			var _props6 = this.props,
			    positionV = _props6.positionV,
			    positionH = _props6.positionH,
			    styleButtonWrap = _props6.styleButtonWrap;

			var transitionState = this.getCurrentTransitionState();
			var styles = this.styles;

			if (this.isToolbox()) {
				return (0, _simpleAssign2.default)({}, styles.btnWrap.main, styles.btnWrap[positionV], styles.btnWrap[positionH], styleButtonWrap, styles.btnWrap.toolbox[transitionState]);
			}

			return (0, _simpleAssign2.default)({}, styles.btnWrap.main, styles.btnWrap[positionV], styles.btnWrap[positionH], styleButtonWrap);
		}

		/**
   * @returns {Object} merged styles for the `FloatingActionButton`
   */

	}, {
		key: 'getStylesMain',
		value: function getStylesMain() {
			var _props7 = this.props,
			    positionV = _props7.positionV,
			    style = _props7.style;

			var styles = this.styles;

			return (0, _simpleAssign2.default)({}, styles.root.main, styles.root[positionV], style);
		}

		/**
   * @returns {Object} merged styles for the `FloatingActionButton`
   */

	}, {
		key: 'getStylesContentWrap',
		value: function getStylesContentWrap() {
			var _props8 = this.props,
			    positionV = _props8.positionV,
			    positionH = _props8.positionH;
			var isOpen = this.state.isOpen;

			var styles = this.styles;
			var stylesNotBubbleList = {};

			if (!this.isChildrenBubbleList()) {
				stylesNotBubbleList = (0, _simpleAssign2.default)({}, styles.notBubbleList.main, styles.notBubbleList[isOpen ? 'visible' : 'invisible']);
			}

			return (0, _simpleAssign2.default)({}, styles.contentWrap.main, styles.contentWrap[positionV], styles.contentWrap[positionH], styles.contentWrap.direction[this.getDirection()], styles.contentWrap.alignment[this.getAlignment()], stylesNotBubbleList);
		}

		/**
   * @returns {Object} merged styles for the primary text
   */

	}, {
		key: 'getStylesPrimaryText',
		value: function getStylesPrimaryText() {
			var positionH = this.props.positionH;
			var isOpen = this.state.isOpen;

			var styles = this.styles;

			return (0, _simpleAssign2.default)({}, styles.primaryText.main, styles.primaryText[String(isOpen)], styles.primaryText[positionH]);
		}

		/**
   * @returns {Object} styles for backdrop element
   */

	}, {
		key: 'getStylesBackdrop',
		value: function getStylesBackdrop() {
			var _state3 = this.state,
			    isOpen = _state3.isOpen,
			    isBackdropFocused = _state3.isBackdropFocused;

			var styles = this.styles;
			var stylesLink = isOpen ? styles.backdrop.main : styles.backdrop.invisible;
			var stylesLinkFocused = isBackdropFocused ? styles.backdrop.focus : {};

			return (0, _simpleAssign2.default)({}, stylesLink, stylesLinkFocused);
		}

		/**
   * @returns {Object} styles for toolbox element
   */

	}, {
		key: 'getStylesToolbox',
		value: function getStylesToolbox() {
			var isOpen = this.state.isOpen;
			var toolbox = this.props.toolbox;

			var styles = this.styles;

			if (!isOpen) {
				return (0, _simpleAssign2.default)({}, styles.toolbox.main);
			}

			var stylesOpen = {
				height: toolbox.height
			};

			return (0, _simpleAssign2.default)({}, styles.toolbox.main, stylesOpen);
		}

		/**
   * @returns {Object} styles for toolbox inner elements
   */

	}, {
		key: 'getStylesToolboxInner',
		value: function getStylesToolboxInner() {
			return (0, _simpleAssign2.default)({}, this.styles.toolboxInner.main, this.styles.toolboxInner[this.getCurrentTransitionState()]);
		}

		/**
   * @returns {Object} styles for toolbox element
   */

	}, {
		key: 'getStylesMorphActionButton',
		value: function getStylesMorphActionButton() {
			var styles = this.styles;
			var stylesWrap = this.getStylesBtn();
			var stylesButton = this.getActionButtonStyles();
			var stylesMain = (0, _simpleAssign2.default)({}, styles.morphActionButton.main, {
				backgroundColor: stylesButton.backgroundColor || _colors.cyan500,
				width: stylesButton.width || 56,
				height: stylesButton.height || 56
			});

			return (0, _simpleAssign2.default)({}, stylesWrap, stylesMain, styles.morphActionButton[this.getCurrentTransitionState()]);
		}

		/**
   * @param {Object} newState - the new state
   * @returns {void}
   */

	}, {
		key: 'updateState',
		value: function updateState(newState) {
			this.setState(newState);
			this.props.onChangeState(newState);
		}

		/**
   * @returns {boolean} returns true if the children component is `BubbleList` component
   */

	}, {
		key: 'isChildrenBubbleList',
		value: function isChildrenBubbleList() {
			var children = this.props.children;

			return isValidChild(children, 'BubbleList');
		}

		/**
   * @returns {boolean} returns true if toolbox object exist and the height is set
   */

	}, {
		key: 'isToolbox',
		value: function isToolbox() {
			var toolbox = this.props.toolbox;

			return Boolean(toolbox && typeof toolbox.height === 'number');
		}

		/**
   * @returns {Array} returns the icon component's
   */

	}, {
		key: 'renderIcon',
		value: function renderIcon() {
			var _props9 = this.props,
			    icon = _props9.icon,
			    iconOpen = _props9.iconOpen;
			var isOpen = this.state.isOpen;


			return [_react2.default.cloneElement(icon, {
				key: '0',
				style: isOpen ? this.styles.iconClosed.invisible : this.styles.iconClosed.main
			}), _react2.default.cloneElement(iconOpen, {
				key: '1',
				style: isOpen ? this.styles.iconOpen.main : this.styles.iconOpen.invisible
			})];
		}

		/**
   * @returns {XML} returns the children toolbox eg. `BottomNavigation` component
   */

	}, {
		key: 'renderToolbox',
		value: function renderToolbox() {
			var _props10 = this.props,
			    toolbox = _props10.toolbox,
			    children = _props10.children;


			if (!this.isToolbox()) {
				return null;
			}

			return _react2.default.createElement(
				'div',
				{
					className: toolbox.className,
					style: this.getStylesToolbox()
				},
				_react2.default.createElement(
					'div',
					{ style: this.styles.morphWrap },
					this.renderMorphActionButton()
				),
				_react2.default.createElement(
					'div',
					{ style: this.getStylesToolboxInner() },
					_react2.default.cloneElement(children, {
						onClickCloseToolbox: this.handleClickCloseToolbox
					})
				)
			);
		}

		/**
   * @returns {XML} returns the children (list)
   */

	}, {
		key: 'renderChildren',
		value: function renderChildren() {
			var _props11 = this.props,
			    children = _props11.children,
			    positionV = _props11.positionV;
			var _state4 = this.state,
			    isOpen = _state4.isOpen,
			    isInTransition = _state4.isInTransition;


			if (this.isToolbox()) {
				return null;
			}

			if (!isValidChild(children, 'BubbleList')) {
				return children;
			}

			return _react2.default.cloneElement(children, {
				isOpen: isOpen,
				isInTransition: isInTransition,
				direction: this.getDirection(),
				alignment: this.getAlignment(),
				positionV: positionV,
				ref: 'list'
			});
		}

		/**
   * @returns {XML} returns the backdrop
   */

	}, {
		key: 'renderBackdrop',
		value: function renderBackdrop() {
			var _props12 = this.props,
			    hasBackdrop = _props12.hasBackdrop,
			    classNameBackdrop = _props12.classNameBackdrop,
			    tabIndex = _props12.tabIndex,
			    styleBackdrop = _props12.styleBackdrop;
			var isOpen = this.state.isOpen;

			var styles = this.styles;
			var stylesWrap = isOpen ? styles.backdropWrap.main : styles.backdropWrap.invisible;

			if (!hasBackdrop || this.isToolbox()) {
				return null;
			}

			return _react2.default.createElement(
				'span',
				{
					className: classNameBackdrop,
					style: (0, _simpleAssign2.default)({}, stylesWrap, styleBackdrop)
				},
				_react2.default.createElement('a', {
					style: this.getStylesBackdrop(),
					tabIndex: isOpen ? tabIndex + 1 : -1,
					onBlur: this.handleBlurBackdrop,
					onFocus: this.handleFocusBackdrop,
					onKeyUp: this.handleBackdropKeyUp,
					onTouchTap: this.handleClickBackdrop
				})
			);
		}

		/**
   * @returns {XML} returns the primary text
   */

	}, {
		key: 'renderPrimaryText',
		value: function renderPrimaryText() {
			var _props13 = this.props,
			    primaryText = _props13.primaryText,
			    onClickPrimaryButton = _props13.onClickPrimaryButton,
			    tabIndex = _props13.tabIndex;
			var isOpen = this.state.isOpen;


			if (['left', 'right'].indexOf(this.getDirection()) >= 0) {
				return null;
			}

			if (!primaryText || primaryText === '') {
				return null;
			}

			return _react2.default.createElement(
				'ul',
				{ style: this.getStylesPrimaryText() },
				_react2.default.createElement(_bubbleListItem2.default, {
					isOpen: true,
					primaryText: primaryText,
					tabIndex: isOpen ? tabIndex : -1,
					onClick: onClickPrimaryButton,
					onFocus: this.handleFocusPrimaryText
				})
			);
		}

		/**
   * @returns {XML} returns the morphing ActionButton
   */

	}, {
		key: 'renderMorphActionButton',
		value: function renderMorphActionButton() {

			var transitionState = this.getCurrentTransitionState();
			var toolbox = this.props.toolbox;

			var classNames = [];

			if (toolbox.classNameMorphButton) {
				classNames.push(toolbox.classNameMorphButton);
			}

			if (transitionState === 'closing') {
				classNames.push(keyFrameClosingClassName + this.instanceKey);
			}

			if (transitionState === 'opening') {
				classNames.push(keyFrameClassName + this.instanceKey);
			}

			return _react2.default.createElement('div', {
				className: classNames.join(' '),
				ref: 'morphBtn',
				style: this.getStylesMorphActionButton()
			});
		}

		/**
   * @returns {XML} returns a style tag
   */

	}, {
		key: 'renderCssKeyframes',
		value: function renderCssKeyframes() {
			var _props14 = this.props,
			    toolbox = _props14.toolbox,
			    positionH = _props14.positionH;


			if (!this.isToolbox()) {
				return null;
			}

			var options = {
				height: toolbox.height,
				btnHeight: 56,
				positionH: positionH
			};

			return _react2.default.createElement(
				'style',
				null,
				(0, _speedDial7.getCssKeyFrames)(keyFrameClassName, this.instanceKey, options),
				(0, _speedDial7.getCssKeyFramesClosing)(keyFrameClosingClassName, this.instanceKey, options)
			);
		}

		/**
   * @returns {XML} returns the component
   */

	}, {
		key: 'render',
		value: function render() {
			var _props15 = this.props,
			    floatingActionButtonProps = _props15.floatingActionButtonProps,
			    className = _props15.className,
			    classNameInTransition = _props15.classNameInTransition,
			    classNameOpen = _props15.classNameOpen,
			    classNameButtonWrap = _props15.classNameButtonWrap,
			    tabIndex = _props15.tabIndex;
			var _state5 = this.state,
			    isOpen = _state5.isOpen,
			    isInTransition = _state5.isInTransition;

			var handleClick = isOpen ? this.handleClickClose : this.handleClickOpen;
			var classNames = [className];

			var btnProps = (0, _simpleAssign2.default)({}, floatingActionButtonProps, {
				onTouchTap: handleClick
			});

			if (isInTransition && classNameInTransition) {
				classNames.push(classNameInTransition);
			}

			if (isOpen && classNameOpen) {
				classNames.push(classNameOpen);
			}

			return _react2.default.createElement(
				'div',
				{ className: classNames.join(' '), style: this.getStylesMain() },
				this.renderCssKeyframes(),
				this.renderToolbox(),
				this.renderBackdrop(),
				_react2.default.createElement(
					'div',
					{ style: this.getStylesContentWrap() },
					this.renderChildren()
				),
				_react2.default.createElement(
					'div',
					{ className: classNameButtonWrap, style: this.getStylesBtn() },
					this.renderPrimaryText(),
					_react2.default.createElement(
						_FloatingActionButton2.default,
						(0, _extends3.default)({
							ref: 'btn',
							tabIndex: tabIndex
						}, btnProps),
						this.renderIcon()
					)
				)
			);
		}
	}]);
	return SpeedDial;
}(_react2.default.Component);

SpeedDial.displayName = 'SpeedDial';
process.env.NODE_ENV !== "production" ? SpeedDial.propTypes = _speedDial2.default : void 0;
SpeedDial.defaultProps = _speedDial4.default;
SpeedDial.contextTypes = {
	muiTheme: _react2.default.PropTypes.object.isRequired
};

exports.default = SpeedDial;