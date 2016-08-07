/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _odoo = __webpack_require__(1);

	var _odoo2 = _interopRequireDefault(_odoo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _odoo2.default)({ el: '.js-odoo', value: '£40,000,000' });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (_ref) {
	  var _context6;

	  var el = _ref.el;
	  var value = _ref.value;

	  var element = (0, _selection.select)(el);
	  var computedStyle = window.getComputedStyle(element);
	  var fontSize = parseInt(computedStyle.fontSize, 10);
	  var marginBottom = fontSize / 10;
	  var offset = fontSize - marginBottom;
	  var letterSpacing = 1;
	  var animationDelay = 100;

	  var canvasWidth = 0;
	  var canvasHeight = fontSize + marginBottom;

	  var svg = (_context6 = (0, _selection.select)(el), _selection.append).call(_context6, 'svg');
	  var defs = _selection.append.call(svg, 'defs');

	  var values = String(value).split('');
	  var chars = values.map(function (char, i) {
	    if (isNaN(char)) {
	      return {
	        isDigit: false,
	        node: createCharacter(svg, char, fontSize),
	        value: char,
	        offset: { x: 0, y: offset }
	      };
	    } else {
	      return {
	        isDigit: true,
	        id: i,
	        node: createDigitRoulette(svg, fontSize, i),
	        filter: createFilter(defs, i),
	        value: Number(char),
	        offset: { x: 0, y: offset }
	      };
	    }
	  });

	  var transitions = [];
	  var digits = chars.filter(function (char) {
	    return char.isDigit;
	  });
	  console.log(chars, digits);
	  digits.forEach(function (digit, i) {
	    var targetDistance = (ROTATIONS * DIGITS_COUNT + digit.value) * fontSize;
	    var digitTransition = (0, _transition2.default)({
	      from: 0,
	      to: targetDistance,
	      delay: (digits.length - i) * animationDelay,
	      step: function step(value) {
	        var _context7;

	        digit.offset.y = offset + value % (fontSize * DIGITS_COUNT);
	        (_context7 = digit.node, _selection.attr).call(_context7, 'transform', 'translate(' + digit.offset.x + ', ' + digit.offset.y + ')');
	        var filterOrigin = targetDistance / 2;
	        var motionValue = Math.abs(Math.abs(value - filterOrigin) - filterOrigin) / 100;
	        (_context7 = (0, _selection.select)('#motionFilter-' + digit.id + ' .blurValues'), _selection.attr).call(_context7, 'stdDeviation', '0 ' + motionValue);
	      }
	    });
	    transitions.push(digitTransition);
	  });

	  var update = function update(timestamp) {
	    var canvasWidth = 0;
	    chars.forEach(function (char) {
	      var _context8;

	      var _char$node$getBoundin = char.node.getBoundingClientRect();

	      var width = _char$node$getBoundin.width;

	      char.offset.x = canvasWidth;
	      (_context8 = char.node, _selection.attr).call(_context8, 'transform', 'translate(' + char.offset.x + ', ' + char.offset.y + ')');
	      canvasWidth += width + letterSpacing;
	    });

	    setViewBox(svg, canvasWidth, canvasHeight);
	    transitions.forEach(function (transition) {
	      return transition.update(timestamp);
	    });
	  };

	  (0, _loop2.default)(update).start();
	};

	var _loop = __webpack_require__(2);

	var _loop2 = _interopRequireDefault(_loop);

	var _selection = __webpack_require__(3);

	var _transition = __webpack_require__(10);

	var _transition2 = _interopRequireDefault(_transition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DIGITS_COUNT = 10;
	var ROTATIONS = 3;

	var createDigitRoulette = function createDigitRoulette(svg, fontSize, id) {
	  var _context;

	  var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	  var roulette = (_context = _selection.append.call(svg, 'g'), _selection.attr).call(_context, 'id', 'digit-' + id);
	  digits.forEach(function (el, i) {
	    var _context2;

	    (_context2 = (_context2 = (_context2 = (_context2 = (_context2 = _selection.append.call(roulette, 'text'), _selection.attr).call(_context2, 'y', -i * fontSize), _selection.style).call(_context2, 'fill', '#fff'), _selection.style).call(_context2, 'font-size', fontSize + 'px'), _selection.style).call(_context2, 'filter', 'url(#motionFilter-' + id + ')'), _selection.text).call(_context2, el);
	  });
	  return roulette;
	};

	var createCharacter = function createCharacter(svg, el, fontSize) {
	  var _context3;

	  return (_context3 = (_context3 = (_context3 = _selection.append.call(svg, 'text'), _selection.style).call(_context3, 'fill', '#fff'), _selection.style).call(_context3, 'font-size', fontSize + 'px'), _selection.text).call(_context3, el);
	};

	var createFilter = function createFilter(defs, id) {
	  var _context4;

	  return (_context4 = (_context4 = (_context4 = (_context4 = (_context4 = (_context4 = (_context4 = _selection.append.call(defs, 'filter'), _selection.attr).call(_context4, 'id', 'motionFilter-' + id), _selection.attr).call(_context4, 'width', '300%'), _selection.attr).call(_context4, 'x', '-100%'), _selection.append).call(_context4, 'feGaussianBlur'), _selection.attr).call(_context4, 'class', 'blurValues'), _selection.attr).call(_context4, 'in', 'SourceGraphic'), _selection.attr).call(_context4, 'stdDeviation', '0 0');
	};

	var setViewBox = function setViewBox(svg, width, height) {
	  var _context5;

	  return (_context5 = (_context5 = (_context5 = _selection.attr.call(svg, 'width', width), _selection.attr).call(_context5, 'height', height), _selection.attr).call(_context5, 'viewBox', '0 0 ' + width + ' ' + height), _selection.style).call(_context5, 'overflow', 'hidden');
	};

	;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (func) {
	  var step = function step(timestamp) {
	    requestAnimationFrame(step);
	    func(timestamp);
	  };
	  return { start: function start() {
	      return step(0);
	    } };
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _select = __webpack_require__(4);

	Object.defineProperty(exports, 'select', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_select).default;
	  }
	});

	var _append = __webpack_require__(5);

	Object.defineProperty(exports, 'append', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_append).default;
	  }
	});

	var _attr = __webpack_require__(7);

	Object.defineProperty(exports, 'attr', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_attr).default;
	  }
	});

	var _style = __webpack_require__(8);

	Object.defineProperty(exports, 'style', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_style).default;
	  }
	});

	var _text = __webpack_require__(9);

	Object.defineProperty(exports, 'text', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_text).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (selection) {
	  return selection === String(selection) ? document.querySelector(selection) : selection;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (type) {
	  var element = document.createElementNS(_namespaces2.default.svg, type);
	  this.appendChild(element);
	  return element;
	};

	var _namespaces = __webpack_require__(6);

	var _namespaces2 = _interopRequireDefault(_namespaces);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  svg: 'http://www.w3.org/2000/svg'
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (name, value) {
	  this.setAttribute(name, value);
	  return this;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (name, value) {
	  var priority = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

	  this.style.setProperty(name, value, priority);
	  return this;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (value) {
	  this.textContent = value;
	  return this;
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var cubicInOut = function cubicInOut(t) {
	  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
	};
	var linear = function linear(t) {
	  return +t;
	};

	exports.default = function (_ref) {
	  var from = _ref.from;
	  var to = _ref.to;
	  var _ref$duration = _ref.duration;
	  var duration = _ref$duration === undefined ? 3000 : _ref$duration;
	  var _ref$delay = _ref.delay;
	  var delay = _ref$delay === undefined ? 0 : _ref$delay;
	  var _ref$easing = _ref.easing;
	  var easing = _ref$easing === undefined ? cubicInOut : _ref$easing;
	  var _ref$start = _ref.start;
	  var start = _ref$start === undefined ? function (v) {
	    return v;
	  } : _ref$start;
	  var _ref$step = _ref.step;
	  var step = _ref$step === undefined ? function (v) {
	    return v;
	  } : _ref$step;
	  var _ref$end = _ref.end;
	  var end = _ref$end === undefined ? function (v) {
	    return v;
	  } : _ref$end;

	  var value = from;
	  var startTime = 0;
	  var finished = false;
	  var update = function update(timestamp) {
	    if (finished) {
	      return;
	    }
	    if (!startTime) {
	      startTime = timestamp;
	      start(value);
	    }
	    var t = Math.min(Math.max(timestamp - startTime - delay, 0), duration) / duration;
	    value = easing(t) * (to - from) + from;
	    step(value);
	    if (t === 1) {
	      finished = true;
	      end(value);
	    }
	  };
	  return { update: update };
	};

/***/ }
/******/ ]);