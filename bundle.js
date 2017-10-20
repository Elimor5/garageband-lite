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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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

var _timer = __webpack_require__(7);

var _timer2 = _interopRequireDefault(_timer);

var _instrument = __webpack_require__(3);

var _instrument2 = _interopRequireDefault(_instrument);

var _instruments_modal = __webpack_require__(4);

var _instruments_modal2 = _interopRequireDefault(_instruments_modal);

var _ticker = __webpack_require__(9);

var _ticker2 = _interopRequireDefault(_ticker);

var _recording_suite = __webpack_require__(11);

var _recording_suite2 = _interopRequireDefault(_recording_suite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dashboard = function () {
  function Dashboard(keyboard) {
    _classCallCheck(this, Dashboard);

    this.timer = new _timer2.default(this);
    this.instruments = [];
    this.modal = new _instruments_modal2.default();
    this.modal.populateModal(this.addInstrument.bind(this));
    this.keyboard = keyboard;
    this.selectedInstrument = [];
    this.ticker = new _ticker2.default(this.timer);
    this.recordingSuite = new _recording_suite2.default();
  }

  _createClass(Dashboard, [{
    key: 'addInstrument',
    value: function addInstrument(instrumentType) {
      var id = this.instruments.length;
      var newInstrument = new _instrument2.default(id, instrumentType);
      this.instruments.push(newInstrument);
      this.updateKeyboard(instrumentType);
      this.updateSelectedInstrument(newInstrument);
    }
  }, {
    key: 'updateSelectedInstrument',
    value: function updateSelectedInstrument(instrument) {
      this.selectedInstrument = instrument;
    }
  }, {
    key: 'updateKeyboard',
    value: function updateKeyboard(instrumentType) {
      this.keyboard.instrument = instrumentType;
      this.keyboard.updateKeys();
    }
  }]);

  return Dashboard;
}();

exports.default = Dashboard;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _key = __webpack_require__(5);

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
    this.instrument = 'piano';
    this.octave = 3;
  }

  _createClass(Keyboard, [{
    key: 'populateKeys',
    value: function populateKeys() {
      var _this = this;

      for (var i = 0; i < this.notes.length; i++) {
        var key = new _key2.default(this.notes[i], this.octave, this.keyboardChars[i]);
        $("#keyboard").append(key.renderNote());
        this.keys.push(key);
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
  }, {
    key: 'updateKeys',
    value: function updateKeys() {
      var _this2 = this;

      this.keys.forEach(function (key) {
        key.octave = _this2.octave;
        key.setAudio(_this2.instrument);
      });
    }
  }]);

  return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = __webpack_require__(6);

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Instrument = function () {
  function Instrument(id, instrumentType) {
    _classCallCheck(this, Instrument);

    this.id = id;
    this.instrumentType = instrumentType;
    this.soundByteContainer = "";
    this.instrumentLabel = "";
    this.createVisual();
  }

  _createClass(Instrument, [{
    key: "createVisual",
    value: function createVisual() {
      this.createContainers();
      this.populateInstrumentSelector();
      this.populateSoundByteContainer();
    }
  }, {
    key: "createContainers",
    value: function createContainers() {
      this.soundByteContainer = $('<div/>', {
        id: this.instrumentType + "-" + this.id + "-soundByte",
        class: "sound-byte-container"
      });

      this.instrumentLabel = $('<div/>', {
        id: this.instrumentType + "-" + this.id + "-label",
        class: "instrument-label"
      });
    }
  }, {
    key: "populateInstrumentSelector",
    value: function populateInstrumentSelector() {
      $('.instruments-container').append(this.instrumentLabel);

      this.instrumentLabel.append($('<div/>', {
        class: "instrument-label-image-container"
      }));

      $('.instrument-label-image-container').append($('<div/>', {
        class: this.instrumentType + "-image"
      }));

      this.instrumentLabel.append($('<div/>', {
        class: "instrument-label-title-container",
        id: "instrument-label-title-container-" + this.id
      }));

      $("#instrument-label-title-container-" + this.id).append($('<div/>', {
        class: "instrument-label-title",
        text: this.instrumentType[0].toUpperCase() + this.instrumentType.slice(1)
      }));
    }
  }, {
    key: "populateSoundByteContainer",
    value: function populateSoundByteContainer() {
      $('.sound-bytes-inner').append(this.soundByteContainer);
    }
  }, {
    key: "addInstrument",
    value: function addInstrument() {
      $(".instrument-selector");
    }
  }]);

  return Instrument;
}();

exports.default = Instrument;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InstrumentsModal = function () {
  function InstrumentsModal() {
    _classCallCheck(this, InstrumentsModal);

    this.instruments = ["piano"];
    this.instrumentImage = { "piano": './components/piano_image.png' };
    this.modalOpen = false;
    this.toggleInstrumentsModal();
  }

  _createClass(InstrumentsModal, [{
    key: "populateModal",
    value: function populateModal(callback) {
      var _this = this;

      this.instruments.forEach(function (instrument) {
        var src = _this.instrumentImage[instrument];

        $("#instruments-modal").append("\n        <div class=\"modal-image " + instrument + "-image\">\n        </div>");

        $("." + instrument + "-image").on("click", function () {
          callback(instrument);
        });
      });
    }
  }, {
    key: "openModal",
    value: function openModal(modal) {
      $('.dashboard-labels').text("Close Modal");
      $('.modal-image').css("display", "block");
      this.modalOpen = true;

      modal.addClass("instruments-modal-open");
      modal.animate({
        height: "29%",
        width: "17%",
        top: "53%",
        left: "3%"
      });
    }
  }, {
    key: "closeModal",
    value: function closeModal(modal) {
      $('.dashboard-labels').text("Add Instrument");
      $('.modal-image').css("display", "none");
      this.modalOpen = false;

      modal.animate({
        height: "2%",
        width: "1%",
        top: "47%",
        left: "11%"
      });

      setTimeout(function () {
        modal.removeClass("instruments-modal-open");
      }, 401);
    }
  }, {
    key: "toggleInstrumentsModal",
    value: function toggleInstrumentsModal() {
      var _this2 = this;

      $(".dashboard-labels").on("click", function (e) {
        e.stopPropagation();
        var modal = $('#instruments-modal');

        if (_this2.modalOpen === false) {
          _this2.openModal(modal);
        } else {
          _this2.closeModal(modal);
        }
      });
    }
  }]);

  return InstrumentsModal;
}();

exports.default = InstrumentsModal;

/***/ }),
/* 5 */
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
    this.setAudio('piano');
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
    value: function setAudio(instrument) {
      var note = this.note.slice(0, 1).toUpperCase();
      var sharp = this.note[this.note.length - 1] === "#" ? "s" : "";
      var octave = this.note[1] === "2" ? this.octave + 1 : this.octave;
      this.sound = new Audio("assets/" + instrument + "_samples/" + octave + note + sharp + ".mp3");
    }
  }]);

  return Key;
}();

exports.default = Key;

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cursor = __webpack_require__(10);

var _cursor2 = _interopRequireDefault(_cursor);

var _recording = __webpack_require__(12);

var _recording2 = _interopRequireDefault(_recording);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
  function Timer(dashboard) {
    _classCallCheck(this, Timer);

    this.totalElapsedTime = 0;
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.paused = false;
    this.cursor = new _cursor2.default();
    this.setCurrentTime();
    this.interval = null;
    this.timerRunning = false;
    this.currentRecording = null;
    this.dashboard = dashboard;
    this.addListeners();
  }

  _createClass(Timer, [{
    key: 'setCurrentTime',
    value: function setCurrentTime() {
      this.parseTime();

      var paddedTime = this.padTime(this.milliseconds, this.seconds, this.minutes);
      var paddedMinute = paddedTime.paddedMinute,
          paddedSecond = paddedTime.paddedSecond,
          paddedMillisecond = paddedTime.paddedMillisecond;


      $("#timer").text(paddedMinute + ':' + paddedSecond + ':' + paddedMillisecond);
    }
  }, {
    key: 'padTime',
    value: function padTime(milliseconds, seconds, minutes) {
      var paddedMillisecond = milliseconds >= 10 ? milliseconds.toString().slice(0, 2) : "0" + milliseconds;
      var paddedSecond = seconds >= 10 ? seconds : "0" + seconds;
      var paddedMinute = minutes >= 10 ? minutes : "0" + minutes;

      return { paddedMillisecond: paddedMillisecond, paddedSecond: paddedSecond, paddedMinute: paddedMinute };
    }
  }, {
    key: 'parseTime',
    value: function parseTime() {
      while (this.milliseconds >= 1000) {
        this.milliseconds -= 1000;
        this.seconds++;
      }

      while (this.seconds >= 60) {
        this.seconds -= 60;
        this.minutes++;
      }
    }
  }, {
    key: 'resetTimer',
    value: function resetTimer() {
      this.endCurrentRecording();
      this.clearTimer();
      this.stopInterval();
      this.setCurrentTime();
      this.timerRunning = false;
      this.paused = true;
      this.cursor.reset();
    }
  }, {
    key: 'clearTimer',
    value: function clearTimer() {
      this.milliseconds = 0;
      this.seconds = 0;
      this.minutes = 0;
      this.totalElapsedTime = 0;
    }
  }, {
    key: 'stopInterval',
    value: function stopInterval() {
      window.clearInterval(this.interval);
    }
  }, {
    key: 'pauseTimer',
    value: function pauseTimer() {
      this.paused = true;
      this.endCurrentRecording();
      this.stopInterval();
      this.timerRunning = false;
    }
  }, {
    key: 'seek',
    value: function seek(time) {
      this.milliseconds = time;
      this.totalElapsedTime = time;
    }
  }, {
    key: 'runTimer',
    value: function runTimer() {
      var _this = this;

      this.interval = setInterval(function () {
        if (!_this.paused) {
          _this.milliseconds += 100;
          _this.totalElapsedTime += 0.1;
          _this.totalElapsedTime = Math.round(_this.totalElapsedTime * 100) / 100;

          _this.cursor.run();
          _this.setCurrentTime();
        }
      }, 100);
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      var _this2 = this;

      this.toggleRecording();
      this.togglePlay();

      $("#pause-button").on("click", function () {
        return _this2.pauseTimer();
      });
      $("#stop-button").on("click", function () {
        return _this2.resetTimer();
      });
    }
  }, {
    key: 'toggleRecording',
    value: function toggleRecording() {
      var _this3 = this;

      $("#record-button").on("click", function () {
        _this3.createNewRecording();

        if (_this3.paused) _this3.paused = false;
        if (!_this3.timerRunning) _this3.runTimer();

        _this3.timerRunning = true;
      });
    }
  }, {
    key: 'togglePlay',
    value: function togglePlay() {
      var _this4 = this;

      $("#play-button").on("click", function () {
        _this4.endCurrentRecording();

        if (_this4.paused) _this4.paused = false;
        if (!_this4.timerRunning) _this4.runTimer();

        _this4.timerRunning = true;
      });
    }
  }, {
    key: 'createNewRecording',
    value: function createNewRecording() {
      this.currentRecording = new _recording2.default(this.dashboard, this.totalElapsedTime);
      this.dashboard.recordingSuite.push(this.currentRecording);
    }
  }, {
    key: 'endCurrentRecording',
    value: function endCurrentRecording() {
      this.currentRecording.endTime = this.totalElapsedTime;
      this.currentRecording = null;
    }
  }]);

  return Timer;
}();

exports.default = Timer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keyboard = __webpack_require__(1);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _linked_list = __webpack_require__(2);

var _linked_list2 = _interopRequireDefault(_linked_list);

var _Dashboard = __webpack_require__(0);

var _Dashboard2 = _interopRequireDefault(_Dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GaragebandLite = function GaragebandLite() {
  _classCallCheck(this, GaragebandLite);

  this.keyboard = new _keyboard2.default();
  this.keyboard.populateKeys();
  this.song = new _linked_list2.default();
  this.dashboard = new _Dashboard2.default(this.keyboard);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ticker = function () {
  function Ticker(timer) {
    _classCallCheck(this, Ticker);

    this.populateDashboardTicker();
    this.timer = timer;
    this.addTicks();
    this.addEventListener();
  }

  _createClass(Ticker, [{
    key: "populateDashboardTicker",
    value: function populateDashboardTicker() {
      $('.instruments-container').append($("<div/>", {
        class: "timer-ticker-background"
      }));
    }
  }, {
    key: "addTicks",
    value: function addTicks() {
      var c = document.getElementById("timer-ticker");
      var ctx = c.getContext("2d");
      ctx.beginPath();

      for (var i = 0; i < 1400; i += 10) {
        if (i % 50 === 0 && i != 0) {
          var minutes = 0;
          var seconds = i / 10;
          var parsedTime = this.parseTime(seconds, minutes);
          var paddedTime = this.timer.padTime(null, parsedTime[0], parsedTime[1]);
          var paddedSecond = paddedTime.paddedSecond,
              paddedMinute = paddedTime.paddedMinute;


          ctx.font = "10px Arial";
          ctx.strokeText(paddedMinute + ":" + paddedSecond, i - 12, c.height - 10);
        }

        ctx.moveTo(i, c.height);
        ctx.lineTo(i, c.height - 5);
        ctx.strokeStyle = '#f1f1f1';
        ctx.stroke();
      }
    }
  }, {
    key: "parseTime",
    value: function parseTime(seconds, minutes) {
      while (seconds >= 60) {
        seconds -= 60;
        minutes++;
      }
      return [seconds, minutes];
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {
      var _this = this;

      var canvas = $("#timer-ticker");
      var _timer = this.timer,
          setCurrentTime = _timer.setCurrentTime,
          cursor = _timer.cursor,
          clearTimer = _timer.clearTimer;

      setCurrentTime = setCurrentTime.bind(this.timer);
      clearTimer = clearTimer.bind(this.timer);
      canvas.on("click", function (e) {
        var offset = e.offsetX;

        clearTimer();
        var seconds = Math.floor(offset / 10);
        _this.timer.seconds = seconds;
        _this.timer.totalElapsedTime = offset / 10;
        setCurrentTime();
        cursor.seek(offset);
      });
    }
  }]);

  return Ticker;
}();

exports.default = Ticker;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cursor = function () {
  function Cursor() {
    _classCallCheck(this, Cursor);

    this.cursor = $('#cursor');
  }

  _createClass(Cursor, [{
    key: "currentPos",
    value: function currentPos() {
      var pos = this.cursor.css("left");
      return parseInt(pos.slice(0, pos.length - 2));
    }
  }, {
    key: "run",
    value: function run() {
      var currentPos = this.currentPos();
      var nextPos = currentPos + 1;

      var pos = this.cursor.css({ left: nextPos });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.cursor.css({ left: "0px" });
    }
  }, {
    key: "seek",
    value: function seek(pos) {
      this.cursor.css({ left: pos });
    }
  }]);

  return Cursor;
}();

exports.default = Cursor;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RecordingSuite = function () {
  function RecordingSuite() {
    _classCallCheck(this, RecordingSuite);

    this.recordings = [];
  }

  _createClass(RecordingSuite, [{
    key: "push",
    value: function push(el) {
      this.recordings.push(el);
    }
  }]);

  return RecordingSuite;
}();

exports.default = RecordingSuite;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recording = function Recording(dashboard, startTime) {
  _classCallCheck(this, Recording);

  this.keyboard = dashboard.keyboard;
  this.selectedInstrument = dashboard.selectedInstrument;
  this.timer = dashboard.timer;
  this.startTime = startTime;
  this.endTime = null;
};

exports.default = Recording;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map