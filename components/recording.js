import LinkedList from './linked_list';

export default class Recording extends LinkedList {
  constructor(dashboard, startTime) {
    super();
    this.keyboard = dashboard.keyboard;
    this.dashboard = dashboard;
    this.selectedInstrument = dashboard.selectedInstrument;
    this.recordingSuite = dashboard.recordingSuite;
    this.timer = dashboard.timer;
    this.startTime = startTime;
    this.id = this.retrieveVisualId();
    this.endTime = null;
    this.visual = null;
    this.startRecording();
    this.soundByteQueue = [];
    this.addRecordingListeners();
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

  addRecordingListeners() {
    this.clickToSelect();
  }

  clickToSelect() {
    const toggleSelected = this.toggleSelected.bind(this);
    this.visual.on("click", () => {
      toggleSelected();
    });
  }

  toggleSelected() {
    let { recordingSuite } = this;
    let { selectedRecording } = recordingSuite;

    if (selectedRecording === this) {
      recordingSuite.selectedRecording = null;
      this.visual.removeClass("selected-recording");
    } else if (this.endTime && !selectedRecording){
      recordingSuite.selectedRecording = this;
      this.visual.addClass("selected-recording");
    }

  }

  setRecordingStartPos(pos) {
    const originalStartTime = this.startTime;
    const recordingLength = this.endTime - this.startTime;
    const offset = (pos / 10) - this.startTime;
    this.visual.css({ left: pos });
    this.startTime = pos / 10;
    this.endTime = this.startTime + recordingLength;

    this.updateAllSoundBytePositions(originalStartTime,offset);
  }

  updateAllSoundBytePositions(originalStartTime, offset) {
    this.updateAllSoundBytes(originalStartTime, null, (soundByte) => {
      soundByte.updateStartPosition(offset);
    });
  }

  removeAllSoundBytePositionVisuals() {
    this.updateAllSoundBytes(this.startTime, null, (soundByte) => {
      soundByte.removeVisual();
    });
  }

  addAllSoundBytePositions() {
    const recording = this;
    this.updateAllSoundBytes(this.startTime, null, (soundByte) => {
      soundByte.recording = recording;
      soundByte.drawLine();
    });
  }

  deleteVisual() {
    this.visual.remove();
  }

  resizeRecording() {
    const recordingLength = this.endTime - this.startTime;
    const width = ( recordingLength ) * 10;

    this.visual.css({ width: width, backgroundColor: "#84DAA1" });

    this.addAllSoundBytePositions();
    this.updateAllSoundBytePositions(this.startTime, 0);
  }
}
