import LinkedList from './linked_list';

export default class Recording extends LinkedList {
  constructor(dashboard, startTime) {
    super();
    this.keyboard = dashboard.keyboard;
    this.selectedInstrument = dashboard.selectedInstrument;
    this.timer = dashboard.timer;
    this.startTime = startTime;
    this.id = this.retrieveVisualId();
    this.endTime = null;
    this.visual = null;
    this.startRecording();
    this.soundByteQueue = [];
  }

  startRecording() {
    this.createSoundByteVisual();
  }

  createSoundByteVisual() {
    const soundByteContainer = this.selectedInstrument.soundByteContainer;
    const recording = this.createVisual();

    soundByteContainer.append(recording);
  }

  expandCurrentRecording() {
    const newWidth = this.visual.width() + 1;
    this.visual.css("width", newWidth);
  }

  retrieveVisualId() {
    const { id, instrumentType } = this.selectedInstrument;
    return `${instrumentType}-${id}-${this.startTime}`;
  }

  createVisual() {
    const startPosition = this.updateStartPosition();
    this.visual = $("<div/>", {
      id: this.id,
      class: "sound-byte-visual"
    });
    this.visual.css({ left: `${startPosition}` });
    return this.visual;
  }

  updateStartPosition() {
    const pixels = this.startTime * 10;
    return `${pixels}px`;
  }

  endCurrentRecording() {
    this.visual.css({backgroundColor: "#84DAA1"});
    this.endTime = this.timer.totalElapsedTime;
    this.timer.currentRecording = null;
  }

  mapRecordingToKeys() {
    const { keys } = this.keyboard;
    keys.map((key) => {
      key.currentRecording = this;
      // key.addRecordingListener();
      // gotta rerender every key with recording
    });
  }

  playAllSoundBytes(time, soundByte) {
    if (!soundByte) {
      soundByte = this.find(time);
    } else if (soundByte === this.tail) {
      return;
    }

    soundByte.play();
    return this.playAllSoundBytes(time,soundByte.nextNode);
  }
}
