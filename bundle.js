/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _key = __webpack_require__(1);

var _key2 = _interopRequireDefault(_key);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    this.keys = [];
    this.notes = ['c', 'd', 'e', 'f', 'g', 'a', 'b', 'c2', 'd2', 'e2'];
    this.keyboardChars = "asdfghjkl;".split("");
    this.sharpChars = "wetyuop".split("");
    this.octave = 3;
  }

  _createClass(Keyboard, [{
    key: 'populateKeys',
    value: function populateKeys() {
      var _this = this;

      for (var i = 0; i < this.notes.length; i++) {
        var key = new _key2.default(this.notes[i], this.octave, this.keyboardChars[i]);
        $("#keyboard").append(key.renderNote());
      }

      var sharpCharsIndex = 0;
      Array.from($(".piano-key")).map(function (key) {
        var sharps = ["c", "d", "f", "g", "a", "c2", "d2"];
        var note = key.id;

        if (sharps.includes(note)) {
          var sharpKey = new _key2.default(note + '#', _this.octave, _this.sharpChars[sharpCharsIndex]);
          var currentKey = $('#' + key.id);
          sharpCharsIndex++;

          currentKey.append(sharpKey.renderNote("sharp"));
          currentKey.addClass('sharp-key-holder');
        }
      });
    }
  }]);

  return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Key = function () {
  function Key(note, octave, keyboardChar) {
    _classCallCheck(this, Key);

    this.note = note;
    this.octave = octave;
    this.keyboardChar = keyboardChar;
    this.setAudio();
  }

  _createClass(Key, [{
    key: "renderNote",
    value: function renderNote(sharp) {
      var sharpkey = sharp ? "sharp-key" : "";
      var pianoKey = sharp ? "" : "piano-key";
      this.keyDiv = $("<div id=" + this.note + " class=\"" + sharpkey + " " + pianoKey + "\">\n                        <span class=\"key-label\">" + this.keyboardChar.toUpperCase() + "</span>\n                       </div>");
      this.addListener(this.keyDiv, "mouse");
      this.addListener($(document), "key");
      return this.keyDiv;
    }
  }, {
    key: "addListener",
    value: function addListener(element, listener) {
      var _this = this;

      var currentKeyChar = this.keyboardChar;
      var currentKey = this;

      element.on(listener + "down", function (e) {
        e.stopPropagation();

        if (listener === "mouse" || e.key === currentKeyChar) {
          _this.sound.play();
          currentKey.keyDiv.addClass("opacity");
        }
      });

      element.on(listener + "up", function (e) {
        e.stopPropagation();

        if (listener === "mouse" || e.key === currentKeyChar) {
          _this.sound.load();
          currentKey.keyDiv.removeClass("opacity");
        }
      });
    }
  }, {
    key: "setAudio",
    value: function setAudio() {
      var note = this.note.slice(0, 1).toUpperCase();
      var sharp = this.note[this.note.length - 1] === "#" ? "s" : "";
      var octave = this.note[1] === "2" ? this.octave + 1 : this.octave;
      this.sound = new Audio("assets/piano_samples/" + octave + note + sharp + ".mp3");
    }
  }]);

  return Key;
}();

exports.default = Key;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keyboard = __webpack_require__(0);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _linked_list = __webpack_require__(3);

var _linked_list2 = _interopRequireDefault(_linked_list);

var _timer = __webpack_require__(5);

var _timer2 = _interopRequireDefault(_timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GaragebandLite = function GaragebandLite() {
  _classCallCheck(this, GaragebandLite);

  this.keyboard = new _keyboard2.default();
  this.keyboard.populateKeys();
  this.song = new _linked_list2.default();
  this.timer = new _timer2.default();
};

window.garagebandLite = new GaragebandLite();

// class Node {
//   constructor(note,prevNode,nextNode) {
//     this.prevNode = prevNode;
//     this.nextNode = nextNode;
//     this.note = note;
//     this.startTime = null;
//     this.endTime = null;
//   }
//
//   setStartTime(time) {
//     this.startTime = time;
//   }
//
//   setEndTime(time) {
//     this.endTime = time;
//   }
//
//
// }
//
//
// var song = window.garagebandLite.song;
//
// for (var i = 1; i < 11; i++) {
// song.append(new Node(i));
// }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = __webpack_require__(4);

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkedList = function () {
  function LinkedList() {
    _classCallCheck(this, LinkedList);

    this.head = new _node2.default("head");
    this.tail = new _node2.default("tail");
    this.head.nextNode = this.tail;
    this.tail.prevNode = this.head;
    this.nodes = [this.head, this.tail];
  }

  _createClass(LinkedList, [{
    key: "append",
    value: function append(node) {
      var lastNode = this.tail.prevNode;

      node.prevNode = lastNode;
      node.nextNode = this.tail;
      this.tail.prevNode = node;
      lastNode.nextNode = node;
      this.nodes.push(node);
    }
  }, {
    key: "find",
    value: function find(note, node) {
      if (!node) node = this.head;
      if (note === node.note) {
        return node;
      } else if (node === this.tail) {
        return -1;
      } else {
        return this.find(note, node.nextNode);
      }
    }
  }, {
    key: "delete",
    value: function _delete(note) {
      var node = this.find(note);

      if (node === -1) {
        return -1;
      } else {
        var prevNode = node.prevNode;
        var nextNode = node.nextNode;

        prevNode.nextNode = nextNode;
        nextNode.prevNode = prevNode;
      }
    }
  }, {
    key: "returnList",
    value: function returnList(node) {
      var currentList = [];

      if (!node) {
        node = this.head;
      }

      currentList.push(node);

      if (node === this.tail) {
        return currentList;
      } else {
        return currentList.concat(this.returnList(node.nextNode));
      }
    }
  }]);

  return LinkedList;
}();

exports.default = LinkedList;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(note, startTime, endTime) {
    _classCallCheck(this, Node);

    this.prevNode = null;
    this.nextNode = null;
    this.note = note;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  _createClass(Node, [{
    key: "setStartTime",
    value: function setStartTime(time) {
      this.startTime = time;
    }
  }, {
    key: "setEndTime",
    value: function setEndTime(time) {
      this.endTime = time;
    }
  }]);

  return Node;
}();

exports.default = Node;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
  function Timer() {
    _classCallCheck(this, Timer);

    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.paused = false;
    this.setCurrentTime();
    this.interval = null;
    this.timerRunning = false;
    this.addListeners();
  }

  _createClass(Timer, [{
    key: "setCurrentTime",
    value: function setCurrentTime() {
      if (this.milliseconds >= 1000) {
        this.milliseconds -= 1000;
        this.seconds++;
      } else if (this.seconds >= 60) {
        this.seconds -= 60;
        this.minutes++;
      }

      var paddedMillisecond = this.milliseconds > 10 ? this.milliseconds.toString().slice(0, 2) : "0" + this.milliseconds;
      var paddedSecond = this.seconds > 10 ? this.seconds : "0" + this.seconds;
      var paddedMinute = this.minutes > 10 ? this.minutes : "0" + this.minutes;

      $("#timer").text(paddedMinute + ":" + paddedSecond + ":" + paddedMillisecond);
    }
  }, {
    key: "padTime",
    value: function padTime() {}
  }, {
    key: "resetTimer",
    value: function resetTimer() {
      this.milliseconds = 0;
      this.seconds = 0;
      this.minutes = 0;
      this.stopInterval();
      this.setCurrentTime();
      this.timerRunning = false;
    }
  }, {
    key: "stopInterval",
    value: function stopInterval() {
      window.clearInterval(this.interval);
    }
  }, {
    key: "pauseTimer",
    value: function pauseTimer() {
      this.paused = true;
      this.stopInterval();
      this.timerRunning = false;
    }
  }, {
    key: "seek",
    value: function seek(time) {
      this.milliseconds = time;
    }
  }, {
    key: "runTimer",
    value: function runTimer() {
      var _this = this;

      this.interval = setInterval(function () {
        if (!_this.paused) {
          _this.milliseconds += 100;
          _this.setCurrentTime();
        }
      }, 100);
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this2 = this;

      $("#record-button").on("click", function () {
        if (_this2.paused) _this2.paused = false;
        if (!_this2.timerRunning) _this2.runTimer();

        _this2.timerRunning = true;
      });

      $("#play-button").on("click", function () {
        if (_this2.paused) _this2.paused = false;
        if (!_this2.timerRunning) _this2.runTimer();

        _this2.timerRunning = true;
      });

      $("#pause-button").on("click", function () {
        return _this2.pauseTimer();
      });
      $("#stop-button").on("click", function () {
        return _this2.resetTimer();
      });
    }
  }]);

  return Timer;
}();

exports.default = Timer;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map