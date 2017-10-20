export default class Recording {
  constructor(dashboard, startTime) {
    this.keyboard = dashboard.keyboard;
    this.selectedInstrument = dashboard.selectedInstrument;
    this.timer = dashboard.timer;
    this.startTime = startTime;
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
    this.canvas[0].width++
  }

  createCanvasElement() {
    const { id, instrumentType } = this.selectedInstrument;

    this.canvas = $(`<canvas height="64px" width="1px" class="sound-byte-visual" id=${instrumentType}-${id}-${this.startTime}></canvas>`);

    return this.canvas;
  }
}
