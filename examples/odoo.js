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
	var ctx = canvas.getContext('2d');
	document.body.appendChild(canvas);

	var y = 100;

	var drawMotionText = function drawMotionText(_ref) {
	  var text = _ref.text;
	  var x = _ref.x;
	  var y = _ref.y;
	  var _ref$iterations = _ref.iterations;
	  var iterations = _ref$iterations === undefined ? 20 : _ref$iterations;

	  ctx.save();
	  for (var i = 0; i < iterations; i++) {
	    var pos = i - iterations / 2;
	    ctx.globalAlpha = 0.1 - 0.01 * Math.abs(pos);
	    ctx.fillText(text, x, y + pos * 5);
	  }
	  ctx.restore();
	};

	var update = function update() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  // ctx.save();
	  // const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
	  // gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
	  // gradient.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
	  // gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
	  // ctx.fillStyle = gradient;
	  // ctx.fillRect(0, 0, canvas.width, canvas.height);
	  // ctx.restore();

	  ctx.fillStyle = '#FFF';
	  ctx.font = 'bold 100px Arial Black';

	  drawMotionText({ text: '0', x: 0, y: y });

	  y++;
	  if (y > 300) {
	    y = 0;
	  }
	};

	var loop = function loop() {
	  requestAnimationFrame(loop);
	  update();
	};

	loop();

/***/ }
/******/ ]);