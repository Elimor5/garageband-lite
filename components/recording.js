export default class Recording {
  constructor(dashboard, startTime) {
    this.keyboard = dashboard.keyboard;
    this.selectedInstrument = dashboard.selectedInstrument;
    this.timer = dashboard.timer;
    this.startTime = startTime;
    this.id = this.retrieveCanvasId();
    this.endTime = null;
    this.canvas = null;
    this.startRecording();
  }

  startRecording() {
    this.createSoundByteVisual();
  }

  createSoundByteVisual() {
    const soundByteContainer = this.selectedInstrument.soundByteContainer;
    const recording = this.createCanvasElement();

    soundByteContainer.append(recording);
  }

  expandCurrentRecording() {
    this.canvas[0].width++;
  }

  retrieveCanvasId() {
    const { id, instrumentType } = this.selectedInstrument;
    return `${instrumentType}-${id}-${this.startTime}`;
  }

  createCanvasElement() {
    const startPosition = this.updateStartPosition(this.startTime);
    this.canvas = $(`<canvas height="64px" width="1px" class="sound-byte-visual" id=${this.id}></canvas>`);
    this.canvas.css({ backgroundColor: "#FF7F7F", left: `${startPosition}` });
    debugger
    return this.canvas;
  }

  updateStartPosition(pos) {
    const pixels = pos * 10;
    return `${pixels}px`;
  }

  endCurrentRecording() {
    this.canvas.css({backgroundColor: "#84DAA1"});
    this.endTime = this.timer.totalElapsedTime;
    timer.currentRecording = null;
  }
}
