'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  className: 'animation',
  name: 'animationFrame',
  type: 'linear',
  duration: '0.45s',
  iterationCount: 1
};

/**
 *
 * const transformations = {};
 * transformations['0%'] = { translate: '0px,0px', rotate: '0deg' }
 * transformations['50%'] = { translate: '200px,0px', rotate: '180deg' }
 *
 * createKeyframes('element-animation', transformations)
 *
 * .element-animation{
 * 		animation: animationFrames linear 4s;
 * 		animation-iteration-count: 1;
 * }
 * @keyframes animationFrames{
 * 		0% {
 * 			transform:  translate(0px,0px)  rotate(0deg) ;
 * 		}
 * 		100% {
 * 			transform:  translate(200px,0px)  rotate(180deg) ;
 * 		}
 * }
 *
 * @param {Object} options - the animation options
 * @param {Object} transformations - transformation steps
 * @returns {string} the keyframe css string
 */
function createKeyframes(options, transformations) {

  var out = [];

  var _Object$assign = (0, _simpleAssign2.default)({}, defaults, options),
      className = _Object$assign.className,
      name = _Object$assign.name,
      type = _Object$assign.type,
      duration = _Object$assign.duration,
      iterationCount = _Object$assign.iterationCount;

  var animations = ['animation:' + name + ' ' + type + ' ' + duration + ';', 'animation-iteration-count:' + iterationCount + ';'];
  out.push('.' + className + '{' + animations.join('') + '}');
  out.push('@keyframes ' + name + '{');
  (0, _keys2.default)(transformations).forEach(function (step) {
    var transform = [];
    var transformObj = transformations[step];
    (0, _keys2.default)(transformObj).forEach(function (transName) {
      transform.push(transName + '(' + transformObj[transName] + ')');
    });
    out.push(step + '{transform:' + transform.join(' ') + '}');
  });
  out.push('}');
  return out.join('');
}

exports.default = createKeyframes;