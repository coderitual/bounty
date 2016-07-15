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
/***/ function(module, exports) {

	'use strict';

	var canvas = document.createElement('canvas');
	canvas.height = 600;
	canvas.width = 1500;
	var ctx = canvas.getContext('2d');
	document.body.appendChild(canvas);

	var WIDTH = canvas.width;
	var HEIGHT = canvas.height;

	var rotate = function rotate(index, max) {
	  if (index < 0) {
	    return max + index;
	  } else if (index >= max) {
	    return index % max;
	  }
	  return index;
	};

	var drawMotionText = function drawMotionText(_ref) {
	  var text = _ref.text;
	  var x = _ref.x;
	  var y = _ref.y;
	  var _ref$iterations = _ref.iterations;
	  var iterations = _ref$iterations === undefined ? 20 : _ref$iterations;

	  for (var i = 0; i < iterations; i++) {
	    var pos = i - iterations / 2;
	    ctx.globalAlpha = 0.2 - 0.02 * Math.abs(pos);
	    ctx.fillText(text, x, y + pos * 5);
	  }
	};

	var DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var DIGITS_COUNT = DIGITS.length;

	var fontHeight = 300;

	var createDigitRoutlette = function createDigitRoutlette() {
	  var originX = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	  var targetIndex = 5;
	  var targetRounds = 1;
	  var startIndex = 0;
	  var originY = HEIGHT / 2;

	  var currentIndex = startIndex;
	  var pathLength = (targetRounds * DIGITS_COUNT + targetIndex) * fontHeight;
	  var pathY = 0;

	  var y = pathY;
	  var x = originX;

	  var update = function update() {
	    pathY += 100;
	    var offset = fontHeight / 2;
	    y = (pathY + offset) % (HEIGHT / 2);
	    currentIndex = rotate((pathY + offset) / (HEIGHT / 2) | 0, DIGITS_COUNT);

	    drawMotionText({
	      text: DIGITS[currentIndex],
	      x: x,
	      y: y + originY - fontHeight / 2
	    });
	    drawMotionText({
	      text: DIGITS[rotate(currentIndex - 1, DIGITS_COUNT)],
	      x: x,
	      y: y + fontHeight + originY - offset
	    });
	    drawMotionText({
	      text: DIGITS[rotate(currentIndex + 1, DIGITS_COUNT)],
	      x: x,
	      y: y - fontHeight + originY - offset
	    });
	  };

	  return { update: update };
	};

	var digit = createDigitRoutlette();
	var digit2 = createDigitRoutlette(200);
	var digit3 = createDigitRoutlette(400);

	var update = function update() {
	  ctx.clearRect(0, 0, WIDTH, HEIGHT);
	  ctx.fillStyle = '#FFF';
	  ctx.font = 'bold ' + fontHeight + 'px ITV Reem';
	  // ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
	  // ctx.shadowOffsetX = 2;
	  // ctx.shadowOffsetY = 2;
	  // ctx.shadowBlur = 10;
	  ctx.textBaseline = 'middle';
	  digit.update();
	  digit2.update();
	  digit3.update();
	};

	var loop = function loop() {
	  requestAnimationFrame(loop);
	  update();
	};

	loop();

/***/ }
/******/ ]);