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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GaragebandLite = function GaragebandLite() {
  _classCallCheck(this, GaragebandLite);

  this.keyboard = new _keyboard2.default();
  this.keyboard.populateKeys();
};

new GaragebandLite();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map