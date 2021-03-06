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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
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

var _node = __webpack_require__(1);

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
    value: function find(time, node) {
      if (!node) node = this.head;

      if (time > node.startTime && time < node.endTime) {
        return node;
      } else if (node.startTime > time) {
        return node;
      } else if (node === this.tail) {
        return -1;
      } else {
        return this.find(time, node.nextNode);
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
  }, {
    key: "updateAllSoundBytes",
    value: function updateAllSoundBytes(time, soundByte, callback) {
      if (!soundByte) {
        soundByte = this.find(time);
      } else if (soundByte === this.head) {
        return this.updateAllSoundBytes(time, soundByte.nextNode, callback);
      } else if (soundByte === this.tail || soundByte === -1) {
        return;
      }

      callback(soundByte);
      return this.updateAllSoundBytes(time, soundByte.nextNode, callback);
    }
  }, {
    key: "splitNodes",
    value: function splitNodes(time, newList) {
      var firstListLastNode = this.tail.prevNode;
      var splitNode = this.find(time);
      var newlastNode = splitNode.prevNode;

      //reset first list's tail
      newlastNode.nextNode = this.tail;
      this.tail.prevNode = newlastNode;

      //set splitNode to new list
      newList.head.nextNode = splitNode;
      splitNode.prevNode = newList.head;

      //set end of split nodes to end of new list
      firstListLastNode.nextNode = newList.tail;
      newList.tail.prevNode = firstListLastNode;

      // split nodes into respective recording arrays
      var splitNodeIdx = this.nodes.indexOf(splitNode);
      var originalListNodes = this.nodes.slice(0, splitNodeIdx);
      var newListNodes = this.nodes.slice(splitNodeIdx);

      this.nodes = originalListNodes;
      newList.nodes = newList.nodes.concat(newListNodes);

      //update start && endtimes
      newList.endTime = this.endTime;
      this.endTime = time;
      newList.startTime = time;
    }

    // updateVisual( endTime) {
    //
    // }

  }]);

  return LinkedList;
}();

exports.default = LinkedList;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node() {
    _classCallCheck(this, Node);

    this.prevNode = null;
    this.nextNode = null;
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _linked_list = __webpack_require__(0);

var _linked_list2 = _interopRequireDefault(_linked_list);

var _sound_byte = __webpack_require__(3);

var _sound_byte2 = _interopRequireDefault(_sound_byte);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Recording = function (_LinkedList) {
  _inherits(Recording, _LinkedList);

  function Recording(dashboard, startTime) {
    _classCallCheck(this, Recording);

    var _this = _possibleConstructorReturn(this, (Recording.__proto__ || Object.getPrototypeOf(Recording)).call(this));

    _this.keyboard = dashboard.keyboard;
    _this.dashboard = dashboard;
    _this.selectedInstrument = dashboard.selectedInstrument;
    _this.recordingSuite = dashboard.recordingSuite;
    _this.timer = dashboard.timer;
    _this.startTime = startTime;
    _this.id = _this.retrieveVisualId();
    _this.endTime = null;
    _this.visual = null;
    _this.startRecording();
    _this.soundByteQueue = [];
    _this.addRecordingListeners();
    return _this;
  }

  _createClass(Recording, [{
    key: 'startRecording',
    value: function startRecording() {
      this.createSoundByteVisual();
    }
  }, {
    key: 'createSoundByteVisual',
    value: function createSoundByteVisual() {
      var soundByteContainer = this.selectedInstrument.soundByteContainer;
      var recording = this.createVisual();

      soundByteContainer.append(recording);
    }
  }, {
    key: 'expandCurrentRecording',
    value: function expandCurrentRecording() {
      var newWidth = this.visual.width() + 1;
      this.visual.css("width", newWidth);
    }
  }, {
    key: 'retrieveVisualId',
    value: function retrieveVisualId() {
      var _selectedInstrument = this.selectedInstrument,
          id = _selectedInstrument.id,
          instrumentType = _selectedInstrument.instrumentType;

      return instrumentType + '-' + id + '-' + this.startTime;
    }
  }, {
    key: 'createVisual',
    value: function createVisual() {
      var startPosition = this.updateStartPosition();
      this.visual = $("<div/>", {
        id: this.id,
        class: "sound-byte-visual"
      });
      this.visual.css({ left: '' + startPosition });
      this.visual.attr({ draggable: "true" });
      return this.visual;
    }
  }, {
    key: 'updateStartPosition',
    value: function updateStartPosition() {
      var pixels = this.startTime * 10;
      return pixels + 'px';
    }
  }, {
    key: 'endCurrentRecording',
    value: function endCurrentRecording() {
      this.visual.css({ backgroundColor: "#84DAA1" });
      this.endTime = this.timer.totalElapsedTime;
      this.timer.currentRecording = null;
    }
  }, {
    key: 'mapRecordingToKeys',
    value: function mapRecordingToKeys() {
      var _this2 = this;

      var keys = this.keyboard.keys;

      keys.map(function (key) {
        key.currentRecording = _this2;
        // key.addRecordingListener();
        // gotta rerender every key with recording
      });
    }
  }, {
    key: 'addRecordingListeners',
    value: function addRecordingListeners() {
      this.clickToSelect();
    }
  }, {
    key: 'clickToSelect',
    value: function clickToSelect() {
      var toggleSelected = this.toggleSelected.bind(this);
      this.visual.on("click", function () {
        toggleSelected();
      });
    }
  }, {
    key: 'toggleSelected',
    value: function toggleSelected() {
      var recordingSuite = this.recordingSuite;
      var selectedRecording = recordingSuite.selectedRecording;


      if (selectedRecording === this) {
        recordingSuite.selectedRecording = null;
        this.visual.removeClass("selected-recording");
      } else if (this.endTime) {

        if (selectedRecording) {
          selectedRecording.visual.removeClass("selected-recording");
        }

        recordingSuite.selectedRecording = this;
        this.visual.addClass("selected-recording");
      }
    }
  }, {
    key: 'setRecordingStartPos',
    value: function setRecordingStartPos(pos) {
      var originalStartTime = this.startTime;
      var recordingLength = this.endTime - this.startTime;
      var offset = pos / 10 - this.startTime;
      this.visual.css({ left: pos });
      this.startTime = pos / 10;
      this.endTime = this.startTime + recordingLength;

      this.updateAllSoundBytePositions(originalStartTime, offset);
    }
  }, {
    key: 'updateAllSoundBytePositions',
    value: function updateAllSoundBytePositions(originalStartTime, offset) {
      this.updateAllSoundBytes(originalStartTime, null, function (soundByte) {
        soundByte.updateStartEndPosition(offset);
      });
    }
  }, {
    key: 'removeAllSoundBytePositionVisuals',
    value: function removeAllSoundBytePositionVisuals() {
      this.updateAllSoundBytes(this.startTime, null, function (soundByte) {
        soundByte.removeVisual();
      });
    }
  }, {
    key: 'addAllSoundBytePositions',
    value: function addAllSoundBytePositions() {
      var recording = this;
      this.updateAllSoundBytes(this.startTime, null, function (soundByte) {
        soundByte.recording = recording;
        soundByte.drawLine();
      });
    }
  }, {
    key: 'deleteVisual',
    value: function deleteVisual() {
      this.visual.remove();
    }
  }, {
    key: 'resizeRecording',
    value: function resizeRecording() {
      var recordingLength = this.endTime - this.startTime;
      var width = recordingLength * 10;

      this.visual.css({ width: width, backgroundColor: "#84DAA1" });

      this.addAllSoundBytePositions();
      this.updateAllSoundBytePositions(this.startTime, 0);
    }
  }, {
    key: 'dupSoundBytes',
    value: function dupSoundBytes(newRecording) {
      var newSoundBytes = [];

      this.updateAllSoundBytes(this.startTime, null, function (soundByte) {
        var dup = new _sound_byte2.default(soundByte.key, newRecording);
        dup.startTime = soundByte.startTime;
        dup.endTime = soundByte.endTime;
        dup.updateStartEndPosition(0);
        newSoundBytes.push(dup);
      });
      return newSoundBytes;
    }
  }]);

  return Recording;
}(_linked_list2.default);

exports.default = Recording;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = __webpack_require__(1);

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SoundByte = function (_Node) {
  _inherits(SoundByte, _Node);

  function SoundByte(key, recording) {
    _classCallCheck(this, SoundByte);

    var _this = _possibleConstructorReturn(this, (SoundByte.__proto__ || Object.getPrototypeOf(SoundByte)).call(this));

    _this.startTime = recording.timer.totalElapsedTime;
    _this.endTime = null;
    _this.recording = recording;
    _this.key = key;
    _this.yPos = null;
    _this.startXPos = null;
    _this.endXPos = null;
    _this.note = null;
    _this.octave = _this.key.octave;
    _this.sound = _this.key.sound;
    _this.addToRecording(_this.recording);
    _this.getStartPositions();
    return _this;
  }

  _createClass(SoundByte, [{
    key: "addToRecording",
    value: function addToRecording(recording) {
      recording.append(this);
    }
  }, {
    key: "getStartPositions",
    value: function getStartPositions() {
      this.getStartXPos();
      this.getYPos();
    }
  }, {
    key: "updateStartEndPosition",
    value: function updateStartEndPosition(offset) {
      this.startTime = this.startTime + offset;
      this.endTime = this.endTime + offset;

      this.getStartPositions();

      this.endXPos = (this.endTime - this.recording.startTime) * 10;
      if (this.note) this.note.css("left", this.startXPos);
    }
  }, {
    key: "removeVisual",
    value: function removeVisual() {
      this.note.remove();
    }
  }, {
    key: "drawLine",
    value: function drawLine() {
      this.createNote();
    }
  }, {
    key: "createNote",
    value: function createNote() {
      var visual = this.recording.visual;


      this.note = $("<div/>", {
        class: "note"
      });

      this.note.css("left", this.startXPos);
      this.note.css("top", this.yPos);
      this.note.css("width", this.endXPos - this.startXPos);

      visual.append(this.note);
    }
  }, {
    key: "getStartXPos",
    value: function getStartXPos() {
      var recordingStartTime = this.recording.startTime;
      this.startXPos = (this.startTime - recordingStartTime) * 10;
    }
  }, {
    key: "getYPos",
    value: function getYPos() {
      var keys = this.recording.keyboard.keys;
      var visual = this.recording.visual;

      var notes = keys.map(function (key) {
        return key.note;
      });

      var pos = notes.indexOf(this.key.note);
      pos = pos === 0 ? pos + 0.1 : pos;
      this.yPos = visual.height() * (pos / keys.length);
      // debugger
      // console.log("test")
    }
  }, {
    key: "getEndPos",
    value: function getEndPos() {
      var totalElapsedTime = this.recording.timer.totalElapsedTime;

      var canvasStartTime = this.recording.startTime;

      this.endTime = totalElapsedTime;
      this.endXPos = (totalElapsedTime - canvasStartTime) * 10;
    }
  }, {
    key: "play",
    value: function play() {
      var _this2 = this;

      var _recording$timer = this.recording.timer,
          totalElapsedTime = _recording$timer.totalElapsedTime,
          timerRunning = _recording$timer.timerRunning;

      var startPlayTimeOffset = (this.startTime - totalElapsedTime) * 1000;
      var endPlayTimeOffset = (this.endTime - this.startTime) * 1000;
      var interval;

      interval = setTimeout(function () {
        if (totalElapsedTime > _this2.startTime) {
          var seek = totalElapsedTime - _this2.startTime;
          _this2.playSound(seek);
        } else {
          _this2.playSound();
        }

        setTimeout(function () {
          if (!_this2.key.soundFileMissing) _this2.sound.load();
          _this2.recording.soundByteQueue.pop();
        }, endPlayTimeOffset);
      }, startPlayTimeOffset);

      this.recording.soundByteQueue.push(interval);
    }
  }, {
    key: "playSound",
    value: function playSound(seek) {
      var paused = this.recording.timer.paused;


      if (seek) {
        this.sound.currentTime = seek;
      }

      if (!this.key.soundFileMissing && !paused) this.sound.play();
    }
  }]);

  return SoundByte;
}(_node2.default);

exports.default = SoundByte;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _timer = __webpack_require__(12);

var _timer2 = _interopRequireDefault(_timer);

var _instrument = __webpack_require__(7);

var _instrument2 = _interopRequireDefault(_instrument);

var _instruments_modal = __webpack_require__(8);

var _instruments_modal2 = _interopRequireDefault(_instruments_modal);

var _ticker = __webpack_require__(11);

var _ticker2 = _interopRequireDefault(_ticker);

var _recording_suite = __webpack_require__(10);

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
    this.selectedInstrument = null;
    this.recordingSuite = new _recording_suite2.default();
    this.ticker = new _ticker2.default(this.timer);
  }

  _createClass(Dashboard, [{
    key: 'addInstrument',
    value: function addInstrument(instrumentType) {
      var id = this.instruments.length;
      var newInstrument = new _instrument2.default(id, instrumentType, this);
      newInstrument.addEventListener(this.updateSelectedInstrument.bind(this));

      this.instruments.push(newInstrument);
      this.updateKeyboard(instrumentType);
      this.updateSelectedInstrument(newInstrument);
    }
  }, {
    key: 'updateSelectedInstrument',
    value: function updateSelectedInstrument(instrument) {
      var whiteBorder = '1px solid white';
      var blueBorder = "1px solid #ADD8E6";

      this.clearSelectedBorders(whiteBorder);

      this.selectedInstrument = instrument;

      this.updateKeyboard(instrument.instrumentType);

      this.selectedInstrument.instrumentLabel.css({ backgroundColor: "#ADD8E6", border: blueBorder, zIndex: 1 });
      this.selectedInstrument.soundByteContainer.css({ border: blueBorder, zIndex: 1 });
    }
  }, {
    key: 'clearSelectedBorders',
    value: function clearSelectedBorders(whiteBorder) {
      if (this.selectedInstrument) {
        var _selectedInstrument = this.selectedInstrument,
            instrumentLabel = _selectedInstrument.instrumentLabel,
            soundByteContainer = _selectedInstrument.soundByteContainer;


        instrumentLabel.css({ backgroundColor: '', border: whiteBorder, zIndex: 0 });
        soundByteContainer.css({ border: whiteBorder, zIndex: 0 });
      }
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _key = __webpack_require__(9);

var _key2 = _interopRequireDefault(_key);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    this.keys = [];
    this.notes = ['c', 'd', 'e', 'f', 'g', 'a', 'b', 'c2', 'd2', 'e2'];
    this.sharpNotes = ["c", "d", "f", "g", "a", "c2", "d2"];

    this.keyboardChars = "asdfghjkl;".split("");
    this.sharpChars = "wetyuop".split("");
    this.instrument = 'piano';
    this.octave = 3;
    this.dashboard = null;
    this.addOctaveListeners();
  }

  _createClass(Keyboard, [{
    key: 'populateKeys',
    value: function populateKeys() {
      for (var i = 0; i < this.notes.length; i++) {
        var key = new _key2.default(this.notes[i], this.octave, this.keyboardChars[i]);
        $("#keyboard").append(key.renderNote());
        this.keys.push(key);

        this.populateSharpKeys(key.note);
      }
    }
  }, {
    key: 'populateSharpKeys',
    value: function populateSharpKeys(note) {
      if (this.sharpNotes.includes(note)) {
        var sharpNoteIndex = this.sharpNotes.indexOf(note);
        var sharpKey = new _key2.default(note + '#', this.octave, this.sharpChars[sharpNoteIndex]);
        var currentKey = $('#' + note);

        currentKey.append(sharpKey.renderNote("sharp"));
        this.keys.push(sharpKey);
        currentKey.addClass('sharp-key-holder');
      }
    }
  }, {
    key: 'updateKeys',
    value: function updateKeys() {
      var _this = this;

      this.keys.forEach(function (key) {
        key.octave = _this.octave;
        key.setAudio(_this.instrument);
      });
    }
  }, {
    key: 'addOctaveListeners',
    value: function addOctaveListeners() {
      this.increaseOctaveListener();
      this.decreaseOctaveListener();
      this.addOctaveKeyboardListners();
    }
  }, {
    key: 'increaseOctaveListener',
    value: function increaseOctaveListener() {
      var _this2 = this;

      $("#octave-increase").on("click", function () {
        _this2.adjustOctave(1);
      });
    }
  }, {
    key: 'decreaseOctaveListener',
    value: function decreaseOctaveListener() {
      var _this3 = this;

      $("#octave-decrease").on("click", function () {
        _this3.adjustOctave(-1);
      });
    }
  }, {
    key: 'addOctaveKeyboardListners',
    value: function addOctaveKeyboardListners() {
      var _this4 = this;

      $(document).on("keypress", function (e) {
        if (e.key === ",") {
          e.preventDefault();
          _this4.adjustOctave(-1);
        } else if (e.key === ".") {
          e.preventDefault();
          _this4.adjustOctave(1);
        }
      });
    }
  }, {
    key: 'adjustOctave',
    value: function adjustOctave(num) {
      var _this5 = this;

      var min = void 0;
      var max = void 0;
      var newOctave = this.octave + num;

      switch (this.instrument) {
        case "piano":
          min = 0;
          max = 5;
          break;
        case "violin":
          min = 2;
          max = 5;
          break;
        default:
          min = 0;
          max = 5;
      }

      if (newOctave > min - 1 && newOctave < max + 1) this.octave = newOctave;

      $("#current-octave-heading").text('' + this.octave);
      this.keys.forEach(function (key) {
        key.octave = _this5.octave;
        key.setAudio(_this5.instrument);
      });
    }
  }]);

  return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 6 */
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
    key: "run",
    value: function run(timer) {

      var currentTime = timer.totalElapsedTime * 10;

      var pos = this.cursor.css({ left: currentTime });
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Instrument = function () {
  function Instrument(id, instrumentType, dashboard) {
    _classCallCheck(this, Instrument);

    this.id = id;
    this.instrumentType = instrumentType;
    this.recordingSuite = dashboard.recordingSuite;
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

      this.createDragoverEvent();

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
  }, {
    key: "addEventListener",
    value: function addEventListener(updateSelectedInstrument) {
      var _this = this;

      this.instrumentLabel.on("click", function () {
        updateSelectedInstrument(_this);
      });
    }
  }, {
    key: "createDragoverEvent",
    value: function createDragoverEvent() {
      var _this2 = this;

      this.soundByteContainer[0].ondragend = function (e) {
        e.preventDefault();
        var targetVisual = e.target;
        var offset = e.offsetX;

        _this2.recordingSuite.moveRecording(targetVisual, offset);
      };
    }
  }]);

  return Instrument;
}();

exports.default = Instrument;

/***/ }),
/* 8 */
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

    this.instruments = ["piano", "violin"];
    this.modalOpen = false;
    this.toggleInstrumentsModal();
  }

  _createClass(InstrumentsModal, [{
    key: "populateModal",
    value: function populateModal(callback) {
      this.instruments.forEach(function (instrument) {
        var src = "./components/" + instrument + "_image.png";

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
        height: "300px",
        width: "300px",
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
      var _this = this;

      $(".dashboard-labels").on("click", function (e) {
        e.stopPropagation();
        var modal = $('#instruments-modal');

        if (_this.modalOpen === false) {
          _this.openModal(modal);
        } else {
          _this.closeModal(modal);
        }
      });
    }
  }]);

  return InstrumentsModal;
}();

exports.default = InstrumentsModal;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sound_byte = __webpack_require__(3);

var _sound_byte2 = _interopRequireDefault(_sound_byte);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Key = function () {
  function Key(note, octave, keyboardChar) {
    _classCallCheck(this, Key);

    this.note = note;
    this.octave = octave;
    this.keyboardChar = keyboardChar;
    this.setAudio('piano');
    this.currentRecording = null;
    this.currentSoundByte = null;
    this.soundFileMissing = false;
  }

  _createClass(Key, [{
    key: 'renderNote',
    value: function renderNote(sharp) {
      var sharpkey = sharp ? "sharp-key" : "";
      var pianoKey = sharp ? "" : "piano-key";
      this.keyDiv = $('<div id=' + this.note + ' class="' + sharpkey + ' ' + pianoKey + '">\n                        <span class="key-label">' + this.keyboardChar.toUpperCase() + '</span>\n                       </div>');
      this.addListener(this.keyDiv, "mouse", this.startPlay, this.endPlay);
      this.addListener($(document), "key", this.startPlay, this.endPlay);
      return this.keyDiv;
    }
  }, {
    key: 'addListener',
    value: function addListener(element, listener, startFunc, endFunc) {
      var _this = this;

      var currentKeyChar = this.keyboardChar;
      var recording = this.currentRecording;

      startFunc = startFunc.bind(this);
      endFunc = endFunc.bind(this);

      element.on(listener + 'down', function (e) {
        e.stopPropagation();
        if (listener === "mouse" || e.key === currentKeyChar) {
          if (_this.currentRecording && !_this.currentSoundByte && !_this.soundFileMissing) {
            _this.currentSoundByte = new _sound_byte2.default(_this, _this.currentRecording);
          }
          startFunc();
        }
      });

      element.on(listener + 'up', function (e) {
        e.stopPropagation();

        if (listener === "mouse" || e.key === currentKeyChar) {
          if (_this.currentRecording && !_this.soundFileMissing) {
            _this.currentSoundByte.getEndPos();
            _this.currentSoundByte.drawLine();
            _this.currentSoundByte = null;
          }

          endFunc();
        }
      });
    }
  }, {
    key: 'startPlay',
    value: function startPlay() {
      if (!this.soundFileMissing) {
        this.sound.play();
        this.keyDiv.addClass("opacity");
      }
    }
  }, {
    key: 'endPlay',
    value: function endPlay() {
      if (!this.soundFileMissing) {
        this.sound.load();
        this.keyDiv.removeClass("opacity");
      }
    }
  }, {
    key: 'setAudio',
    value: function setAudio(instrument) {
      var note = this.note.slice(0, 1).toUpperCase();
      var sharp = this.note[this.note.length - 1] === "#" ? "s" : "";
      var octave = this.note[1] === "2" ? this.octave + 1 : this.octave;
      var url = 'assets/' + instrument + '_samples/' + octave + note + sharp + '.mp3';
      this.soundFileMissing = false;

      this.sound = new Audio(url);
      if (instrument === 'violin') this.sound.volume = 0.1;
      // debugger
      var key = this;
      this.sound.onerror = function (err) {
        key.soundFileMissing = true;
      };
    }
  }]);

  return Key;
}();

exports.default = Key;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _recording = __webpack_require__(2);

var _recording2 = _interopRequireDefault(_recording);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RecordingSuite = function () {
  function RecordingSuite() {
    _classCallCheck(this, RecordingSuite);

    this.recordings = [];
    this.selectedRecording = null;
    this.copiedRecording = null;
    this.addRecordSuiteListeners();
  }

  _createClass(RecordingSuite, [{
    key: "push",
    value: function push(el) {
      this.recordings.push(el);
    }
  }, {
    key: "deleteRecordingListener",
    value: function deleteRecordingListener() {
      var _this = this;

      $("#delete-recording").on("click", function () {
        if (_this.selectedRecording) {
          var recordingIdx = _this.recordings.indexOf(_this.selectedRecording);
          _this.recordings.splice(recordingIdx, 1);
          _this.selectedRecording.deleteVisual();
          _this.selectedRecording = null;
          _this.copiedRecording = null;
        }
      });
    }
  }, {
    key: "splitRecordingListener",
    value: function splitRecordingListener() {
      var _this2 = this;

      $("#split-recording").on("click", function () {
        var selectedRecording = _this2.selectedRecording;


        if (selectedRecording) {
          var timer = selectedRecording.timer,
              dashboard = selectedRecording.dashboard;

          var time = timer.totalElapsedTime;
          var newRecording = new _recording2.default(dashboard, time);

          selectedRecording.removeAllSoundBytePositionVisuals();

          selectedRecording.splitNodes(time, newRecording);
          _this2.recordings.push(newRecording);

          _this2.selectedRecording.resizeRecording();
          newRecording.resizeRecording();
        }
      });
    }
  }, {
    key: "copyRecordingListener",
    value: function copyRecordingListener() {
      var _this3 = this;

      $("#copy-recording").on("click", function () {
        var selectedRecording = _this3.selectedRecording;

        if (selectedRecording) {
          var copiedRecording = _this3.copyRecording(selectedRecording);
          _this3.copiedRecording = copiedRecording;
          _this3.copiedRecording.original = selectedRecording;

          selectedRecording.visual.addClass("copied-recording");
        }
      });
    }
  }, {
    key: "pasteRecordingListener",
    value: function pasteRecordingListener() {
      var _this4 = this;

      $("#paste-recording").on("click", function () {
        var selectedRecording = _this4.selectedRecording,
            copiedRecording = _this4.copiedRecording,
            recordings = _this4.recordings;


        if (copiedRecording) {
          var timer = copiedRecording.timer,
              selectedInstrument = copiedRecording.selectedInstrument,
              dashboard = copiedRecording.dashboard;

          recordings.push(copiedRecording);
          _this4.pasteRecording(copiedRecording, timer.totalElapsedTime * 10);

          copiedRecording.original.visual.removeClass("copied-recording");

          delete copiedRecording.original;
          _this4.copiedRecording = null;
        }
      });
    }
  }, {
    key: "copyRecording",
    value: function copyRecording(selectedRecording) {
      var timer = selectedRecording.timer,
          dashboard = selectedRecording.dashboard,
          startTime = selectedRecording.startTime,
          endTime = selectedRecording.endTime,
          nodes = selectedRecording.nodes,
          selectedInstrument = selectedRecording.selectedInstrument;

      dashboard.updateSelectedInstrument(selectedInstrument);

      var copiedRecording = new _recording2.default(dashboard, startTime);
      var copiedSoundBytes = selectedRecording.dupSoundBytes(copiedRecording);

      copiedRecording.endTime = endTime;
      return copiedRecording;
    }
  }, {
    key: "pasteRecording",
    value: function pasteRecording(copiedRecording, time) {
      copiedRecording.resizeRecording();
      copiedRecording.setRecordingStartPos(time);
    }
  }, {
    key: "moveRecording",
    value: function moveRecording(targetVisual, offset) {
      this.recordings.forEach(function (recording) {
        var currentRecording = recording.timer.currentRecording;


        if (recording.visual[0] === targetVisual && !currentRecording) {
          var startTime = recording.startTime * 10;
          var offsetFromStartPos = startTime + offset;
          if (offsetFromStartPos < 0) offsetFromStartPos = 0;

          recording.setRecordingStartPos(offsetFromStartPos);
        }
      });
    }
  }, {
    key: "addRecordSuiteListeners",
    value: function addRecordSuiteListeners() {
      this.deleteRecordingListener();
      this.splitRecordingListener();
      this.copyRecordingListener();
      this.pasteRecordingListener();
    }
  }]);

  return RecordingSuite;
}();

exports.default = RecordingSuite;

/***/ }),
/* 11 */
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

    this.populateDashboardContainers();
    this.timer = timer;
    this.dashboard = timer.dashboard;
    this.populateTicker(0, 1400);
    this.addEventListener();
    this.length = 1400;
  }

  _createClass(Ticker, [{
    key: 'populateDashboardContainers',
    value: function populateDashboardContainers() {
      $('.sound-bytes-inner').append($('<div/>', {
        id: "timer-ticker"
      }));

      $('.instruments-container').append($("<div/>", {
        class: "timer-ticker-background"
      }));
    }
  }, {
    key: 'populateTicker',
    value: function populateTicker(start, end) {
      var ticker = $("#timer-ticker");

      for (var i = start; i < end + 1; i += 10) {
        if (i % 50 === 0 && i != 0) {
          var minutes = 0;
          var seconds = i / 10;

          var parsedTime = this.parseTime(seconds, minutes);
          var paddedTime = this.timer.padTime(null, parsedTime[0], parsedTime[1]);
          var paddedSecond = paddedTime.paddedSecond,
              paddedMinute = paddedTime.paddedMinute;
        }

        this.addTick(i);
      }
    }
  }, {
    key: 'addTick',
    value: function addTick(time) {
      var leftPos = time;
      var ticker = $("#timer-ticker");
      var newTick = $('<div/>', {
        class: "tick"
      });
      newTick.css("left", leftPos + 'px');

      this.addTickTime(time);

      ticker.append(newTick);
    }
  }, {
    key: 'addTickTime',
    value: function addTickTime(time) {
      if (time % 50 === 0 && time != 0) {

        var minutes = 0;
        var seconds = time / 10;

        var parsedTime = this.parseTime(seconds, minutes);
        var paddedTime = this.timer.padTime(null, parsedTime[0], parsedTime[1]);
        var paddedSecond = paddedTime.paddedSecond,
            paddedMinute = paddedTime.paddedMinute;


        var tickTime = $('<div/>', {
          class: "tick-time",
          text: paddedMinute + ':' + paddedSecond
        });

        tickTime.css("left", time - 10 + 'px');
        $("#timer-ticker").append(tickTime);
      }
    }
  }, {
    key: 'parseTime',
    value: function parseTime(seconds, minutes) {
      while (seconds >= 60) {
        seconds -= 60;
        minutes++;
      }
      return [seconds, minutes];
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener() {
      var ticker = $("#timer-ticker");
      var _timer = this.timer,
          setCurrentTime = _timer.setCurrentTime,
          cursor = _timer.cursor,
          clearTimer = _timer.clearTimer,
          updateTimeVariables = _timer.updateTimeVariables,
          pauseTimer = _timer.pauseTimer;
      var recordingSuite = this.dashboard.recordingSuite;

      setCurrentTime = setCurrentTime.bind(this.timer);
      clearTimer = clearTimer.bind(this.timer);
      updateTimeVariables = updateTimeVariables.bind(this.timer);
      pauseTimer = pauseTimer.bind(this.timer);

      ticker.on("click", function (e) {
        e.stopPropagation();
        var innerDivOffset = e.target.id !== "timer-ticker" ? e.target.offsetLeft : 0;
        var offset = e.offsetX + innerDivOffset;

        clearTimer();
        updateTimeVariables(offset);
        setCurrentTime();
        pauseTimer();

        // if (recordingSuite.selectedRecording) recordingSuite.selectedRecording.setRecordingStartPos(offset);

        cursor.seek(offset);
      });
    }
  }, {
    key: 'expandTickerContainer',
    value: function expandTickerContainer() {
      var width = $("#timer-ticker").css("width");
      var widthInt = parseInt(width.slice(0, width.length - 2));
      widthInt++;

      $("#timer-ticker").css("width", widthInt);
      $(".sound-bytes-inner").css("width", widthInt);
    }
  }]);

  return Ticker;
}();

exports.default = Ticker;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cursor = __webpack_require__(6);

var _cursor2 = _interopRequireDefault(_cursor);

var _recording = __webpack_require__(2);

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
      this.clearAllSoundByteQueues();
      window.clearInterval(this.interval);
    }
  }, {
    key: 'clearAllSoundByteQueues',
    value: function clearAllSoundByteQueues() {
      var recordings = this.dashboard.recordingSuite.recordings;

      recordings.forEach(function (recording) {
        var soundByteQueue = recording.soundByteQueue;

        if (soundByteQueue.length > 0) {
          soundByteQueue.forEach(function (queue) {
            clearTimeout(queue);
          });
        }
      });
    }
  }, {
    key: 'pauseTimer',
    value: function pauseTimer() {
      this.paused = true;
      if (this.currentRecording) this.endCurrentRecording();
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
          _this.setTimeVariables();
          _this.cursor.run(_this);
          _this.setCurrentTime();

          if (_this.currentRecording) _this.currentRecording.expandCurrentRecording();
          _this.expandTicker();
        }
      }, 100);
    }
  }, {
    key: 'setTimeVariables',
    value: function setTimeVariables() {
      this.milliseconds += 100;
      this.totalElapsedTime += 0.1;
      this.totalElapsedTime = Math.round(this.totalElapsedTime * 100) / 100;
    }
  }, {
    key: 'updateTimeVariables',
    value: function updateTimeVariables(offset) {
      var seconds = Math.floor(offset / 10);
      this.milliseconds = offset % 10 * 100;
      this.seconds = seconds;
      this.totalElapsedTime = offset / 10;
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      var _this2 = this;

      this.toggleRecording();
      this.togglePlay();
      this.controlRecordingsWithKeyboard();

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
        _this3.startRecording();
      });
    }
  }, {
    key: 'togglePlay',
    value: function togglePlay() {
      var _this4 = this;

      $("#play-button").on("click", function () {
        _this4.play();
      });
    }
  }, {
    key: 'play',
    value: function play() {

      if (this.currentRecording) this.endCurrentRecording();

      if (this.paused) this.paused = false;
      if (!this.timerRunning) this.runTimer();

      this.timerRunning = true;
      this.playRecordings();
    }
  }, {
    key: 'playRecordings',
    value: function playRecordings() {
      var _this5 = this;

      var recordings = this.dashboard.recordingSuite.recordings;


      recordings.forEach(function (recording) {
        if (_this5.totalElapsedTime > recording.endTime || recording === _this5.currentRecording) {
          return;
        }
        recording.updateAllSoundBytes(_this5.totalElapsedTime, null, function (soundByte) {
          return soundByte.play();
        });
      });
    }
  }, {
    key: 'expandTicker',
    value: function expandTicker() {
      if (this.totalElapsedTime > 140) {
        var ticker = this.dashboard.ticker;

        if (this.totalElapsedTime % 1 === 0) {
          var pixels = this.totalElapsedTime * 10;

          ticker.addTick(pixels);
          $(".sound-bytes").scrollLeft(pixels);
        }
        ticker.expandTickerContainer();
      }
    }
  }, {
    key: 'createNewRecording',
    value: function createNewRecording() {
      this.currentRecording = new _recording2.default(this.dashboard, this.totalElapsedTime);
      this.dashboard.recordingSuite.push(this.currentRecording);
      this.currentRecording.mapRecordingToKeys();
    }
  }, {
    key: 'startRecording',
    value: function startRecording() {
      var dashboard = this.dashboard,
          currentRecording = this.currentRecording;
      var instruments = dashboard.instruments;


      if (instruments.length === 0) {
        dashboard.addInstrument("piano");
      }

      if (!currentRecording) {
        this.createNewRecording();

        if (this.paused) this.paused = false;
        if (!this.timerRunning) this.runTimer();
        this.timerRunning = true;

        this.playRecordings();
      }
    }
  }, {
    key: 'endCurrentRecording',
    value: function endCurrentRecording() {
      if (this.currentRecording) this.currentRecording.endCurrentRecording();
    }
  }, {
    key: 'controlRecordingsWithKeyboard',
    value: function controlRecordingsWithKeyboard() {
      var _this6 = this;

      $(document).on("keypress", function (e) {
        if (e.key === " " && _this6.timerRunning) {
          e.preventDefault();
          _this6.pauseTimer();
        } else if (e.key === " ") {
          e.preventDefault();

          if (e.shiftKey) {
            _this6.startRecording();
          } else {
            _this6.play();
          }
        }
      });
    }
  }]);

  return Timer;
}();

exports.default = Timer;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keyboard = __webpack_require__(5);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _linked_list = __webpack_require__(0);

var _linked_list2 = _interopRequireDefault(_linked_list);

var _Dashboard = __webpack_require__(4);

var _Dashboard2 = _interopRequireDefault(_Dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GaragebandLite = function GaragebandLite() {
  _classCallCheck(this, GaragebandLite);

  this.keyboard = new _keyboard2.default();
  this.keyboard.populateKeys();
  this.song = new _linked_list2.default();
  this.dashboard = new _Dashboard2.default(this.keyboard);
  this.keyboard.dashboard = this.dashboard;
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map