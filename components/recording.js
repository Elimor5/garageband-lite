import LinkedList from './linked_list';

export default class Recording extends LinkedList {
  constructor(dashboard, startTime) {
    super();
    this.keyboard = dashboard.keyboard;
    this.selectedInstrument = dashboard.selectedInstrument;
    this.timer = dashboard.timer;
    this.startTime = startTime;
    this.id = this.retrieveCanvasId();
    this.endTime = null;
    this.canvas = null;
    this.ctx = null;
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
    this.ctx = this.canvas[0].getContext('2d');
    this.ctx.beginPath();
    return this.canvas;
  }

  updateStartPosition(pos) {
    const pixels = pos * 10;
    return `${pixels}px`;
  }

  endCurrentRecording() {
    this.canvas.css({backgroundColor: "#84DAA1"});
    this.endTime = this.timer.totalElapsedTime;
    this.timer.currentRecording = null;
  }
}
