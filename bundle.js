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

var _timer = __webpack_require__(12);

var _timer2 = _interopRequireDefault(_timer);

var _instrument = __webpack_require__(5);

var _instrument2 = _interopRequireDefault(_instrument);

var _instruments_modal = __webpack_require__(6);

var _instruments_modal2 = _interopRequireDefault(_instruments_modal);

var _ticker = __webpack_require__(11);

var _ticker2 = _interopRequireDefault(_ticker);

var _recording_suite = __webpack_require__(9);

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
    this.ticker = new _ticker2.default(this.timer);
    this.recordingSuite = new _recording_suite2.default();
  }

  _createClass(Dashboard, [{
    key: 'addInstrument',
    value: function addInstrument(instrumentType) {
      var id = this.instruments.length;
      var newInstrument = new _instrument2.default(id, instrumentType);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _key = __webpack_require__(7);

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
  }]);

  return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 4 */
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
/* 5 */
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
  }, {
    key: "addEventListener",
    value: function addEventListener(updateSelectedInstrument) {
      var _this = this;

      this.instrumentLabel.on("click", function () {
        updateSelectedInstrument(_this);
      });
    }
  }]);

  return Instrument;
}();

exports.default = Instrument;

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sound_byte = __webpack_require__(10);

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
          if (_this.currentRecording && !_this.currentSoundByte) {
            _this.currentSoundByte = new _sound_byte2.default(_this, _this.currentRecording);
          }
          startFunc();
        }
      });

      element.on(listener + 'up', function (e) {
        e.stopPropagation();

        if (listener === "mouse" || e.key === currentKeyChar) {
          if (_this.currentRecording) {
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
    value: function startPlay(seek) {
      if (seek) {
        this.sound.currentTime = seek;
      }

      this.sound.play();
      this.keyDiv.addClass("opacity");
    }
  }, {
    key: 'endPlay',
    value: function endPlay() {
      this.sound.load();
      this.keyDiv.removeClass("opacity");
    }
  }, {
    key: 'setAudio',
    value: function setAudio(instrument) {
      var note = this.note.slice(0, 1).toUpperCase();
      var sharp = this.note[this.note.length - 1] === "#" ? "s" : "";
      var octave = this.note[1] === "2" ? this.octave + 1 : this.octave;
      this.sound = new Audio('assets/' + instrument + '_samples/' + octave + note + sharp + '.mp3');
    }
  }]);

  return Key;
}();

exports.default = Key;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _linked_list = __webpack_require__(0);

var _linked_list2 = _interopRequireDefault(_linked_list);

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
    _this.selectedInstrument = dashboard.selectedInstrument;
    _this.timer = dashboard.timer;
    _this.startTime = startTime;
    _this.id = _this.retrieveVisualId();
    _this.endTime = null;
    _this.visual = null;
    _this.startRecording();
    return _this;
  }

  _createClass(Recording, [{
    key: "startRecording",
    value: function startRecording() {
      this.createSoundByteVisual();
    }
  }, {
    key: "createSoundByteVisual",
    value: function createSoundByteVisual() {
      var soundByteContainer = this.selectedInstrument.soundByteContainer;
      var recording = this.createVisual();

      soundByteContainer.append(recording);
    }
  }, {
    key: "expandCurrentRecording",
    value: function expandCurrentRecording() {
      var newWidth = this.visual.width() + 1;
      this.visual.css("width", newWidth);
    }
  }, {
    key: "retrieveVisualId",
    value: function retrieveVisualId() {
      var _selectedInstrument = this.selectedInstrument,
          id = _selectedInstrument.id,
          instrumentType = _selectedInstrument.instrumentType;

      return instrumentType + "-" + id + "-" + this.startTime;
    }
  }, {
    key: "createVisual",
    value: function createVisual() {
      var startPosition = this.updateStartPosition();
      this.visual = $("<div/>", {
        id: this.id,
        class: "sound-byte-visual"
      });
      this.visual.css({ left: "" + startPosition });
      return this.visual;
    }
  }, {
    key: "updateStartPosition",
    value: function updateStartPosition() {
      var pixels = this.startTime * 10;
      return pixels + "px";
    }
  }, {
    key: "endCurrentRecording",
    value: function endCurrentRecording() {
      this.visual.css({ backgroundColor: "#84DAA1" });
      this.endTime = this.timer.totalElapsedTime;
      this.timer.currentRecording = null;
    }
  }, {
    key: "mapRecordingToKeys",
    value: function mapRecordingToKeys() {
      var _this2 = this;

      var keys = this.keyboard.keys;

      keys.map(function (key) {
        key.currentRecording = _this2;
        // key.addRecordingListener();
        // gotta rerender every key with recording
      });
    }
  }]);

  return Recording;
}(_linked_list2.default);

exports.default = Recording;

/***/ }),
/* 9 */
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
/* 10 */
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

      var totalElapsedTime = this.recording.timer.totalElapsedTime;

      var startPlayTimeOffset = (this.startTime - totalElapsedTime) * 1000;
      var endPlayTimeOffset = (this.endTime - this.startTime) * 1000;

      setTimeout(function () {
        if (totalElapsedTime > _this2.startTime) {
          var seek = totalElapsedTime - _this2.startTime;
          _this2.key.startPlay(seek);
        } else {
          _this2.key.startPlay();
        }

        setTimeout(function () {
          _this2.key.endPlay();
        }, endPlayTimeOffset);
      }, startPlayTimeOffset);
    }
  }]);

  return SoundByte;
}(_node2.default);

exports.default = SoundByte;

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
          updateTimeVariables = _timer.updateTimeVariables;

      setCurrentTime = setCurrentTime.bind(this.timer);
      clearTimer = clearTimer.bind(this.timer);
      updateTimeVariables = updateTimeVariables.bind(this.timer);

      ticker.on("click", function (e) {
        e.stopPropagation();
        var innerDivOffset = e.target.id !== "timer-ticker" ? e.target.offsetLeft : 0;
        var offset = e.offsetX + innerDivOffset;

        clearTimer();
        updateTimeVariables(offset);
        setCurrentTime();

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

var _cursor = __webpack_require__(4);

var _cursor2 = _interopRequireDefault(_cursor);

var _recording = __webpack_require__(8);

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
      }

      // else {
      //   alert("You must add an instrument to the dashboard before recording!");
      // }
      // }
      );
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
      var dashboard = this.dashboard;
      var instruments = dashboard.instruments;


      if (instruments.length === 0) {
        dashboard.addInstrument("piano");
      }

      // if (this.dashboard.selectedInstrument) {
      this.createNewRecording();

      if (this.paused) this.paused = false;
      if (!this.timerRunning) this.runTimer();

      this.timerRunning = true;
    }
  }, {
    key: 'endCurrentRecording',
    value: function endCurrentRecording() {
      this.currentRecording.endCurrentRecording();
    }
  }, {
    key: 'controlRecordingsWithKeyboard',
    value: function controlRecordingsWithKeyboard() {
      var _this5 = this;

      $(document).on("keypress", function (e) {
        if (e.key === " " && _this5.timerRunning) {
          e.preventDefault();
          _this5.pauseTimer();
        } else if (e.key === " ") {
          e.preventDefault();

          if (e.shiftKey) {
            _this5.startRecording();
          } else {
            _this5.play();
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


var _keyboard = __webpack_require__(3);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _linked_list = __webpack_require__(0);

var _linked_list2 = _interopRequireDefault(_linked_list);

var _Dashboard = __webpack_require__(2);

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