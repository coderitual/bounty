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

	(0, _odoo2.default)({ el: '.js-odoo', value: 42000000 });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (_ref) {
	  var _context4;

	  var el = _ref.el;
	  var value = _ref.value;

	  var element = (0, _selection.select)(el);
	  var computedStyle = window.getComputedStyle(element);
	  var fontSize = parseInt(computedStyle.fontSize, 10);
	  var marginBottom = fontSize / 10;
	  var offset = fontSize - marginBottom;
	  var letterSpacing = 1.35;
	  var animationDelay = 100;

	  var canvasWidth = 0;
	  var canvasHeight = fontSize;

	  var svg = (_context4 = (0, _selection.select)(el), _selection.append).call(_context4, 'svg');
	  var defs = _selection.append.call(svg, 'defs');

	  var values = String(value).split('').map(function (value) {
	    return parseInt(value, 10);
	  });
	  var digits = values.map(function (digit, i) {
	    return {
	      node: createDigitRoulette(svg, fontSize, i),
	      filter: createFilter(defs, i),
	      value: digit,
	      offset: { x: 0, y: offset }
	    };
	  });

	  digits.forEach(function (digit) {
	    var _context5;

	    var _digit$node$getBoundi = digit.node.getBoundingClientRect();

	    var width = _digit$node$getBoundi.width;

	    digit.offset.x = canvasWidth;
	    (_context5 = digit.node, _selection.attr).call(_context5, 'transform', 'translate(' + digit.offset.x + ', ' + digit.offset.y + ')');
	    canvasWidth += width * letterSpacing;
	  });

	  (_context4 = (_context4 = (_context4 = _selection.attr.call(svg, 'width', canvasWidth), _selection.attr).call(_context4, 'height', canvasHeight), _selection.attr).call(_context4, 'viewBox', '0 0 ' + canvasWidth + ' ' + canvasHeight), _selection.style).call(_context4, 'overflow', 'hidden');

	  var transitions = [];
	  digits.forEach(function (digit, i) {
	    var targetDistance = (ROTATIONS * DIGITS_COUNT + digit.value) * fontSize;
	    var digitTransition = (0, _transition2.default)({
	      from: 0,
	      to: targetDistance,
	      delay: (digits.length - i) * animationDelay,
	      step: function step(value) {
	        var _context6;

	        var y = digit.offset.y + value % (fontSize * DIGITS_COUNT);
	        (_context6 = digit.node, _selection.attr).call(_context6, 'transform', 'translate(' + digit.offset.x + ', ' + y + ')');
	        var filterOrigin = targetDistance / 2;
	        var motionValue = Math.abs(Math.abs(value - filterOrigin) - filterOrigin) / 100;
	        (_context6 = (0, _selection.select)('#motionFilter-' + i + ' .blurValues'), _selection.attr).call(_context6, 'stdDeviation', '0 ' + motionValue);
	      }
	    });
	    transitions.push(digitTransition);
	  });

	  var update = function update(timestamp) {
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

	var createFilter = function createFilter(defs, id) {
	  var _context3;

	  return (_context3 = (_context3 = (_context3 = (_context3 = (_context3 = (_context3 = (_context3 = _selection.append.call(defs, 'filter'), _selection.attr).call(_context3, 'id', 'motionFilter-' + id), _selection.attr).call(_context3, 'width', '300%'), _selection.attr).call(_context3, 'x', '-100%'), _selection.append).call(_context3, 'feGaussianBlur'), _selection.attr).call(_context3, 'class', 'blurValues'), _selection.attr).call(_context3, 'in', 'SourceGraphic'), _selection.attr).call(_context3, 'stdDeviation', '0 0');
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