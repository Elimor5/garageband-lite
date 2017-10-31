import Node from './node';

export default class SoundByte extends Node {
  constructor(key, recording) {
    super();
    this.startTime = recording.timer.totalElapsedTime;
    this.endTime = null;
    this.recording = recording;
    this.key = key;
    this.yPos = null;
    this.startXPos = null;
    this.endXPos = null;
    this.note = null;
    this.addToRecording(this.recording);
    this.getStartPositions();
  }

  addToRecording(recording) {
    recording.append(this);
  }

  getStartPositions() {
    this.getStartXPos();
    this.getYPos();
  }

  drawLine() {
    this.createNote();
  }

  createNote() {
    const { visual } = this.recording;

    this.note = $("<div/>", {
      class: "note"
    });

    this.note.css("left", this.startXPos);
    this.note.css("top", this.yPos);
    this.note.css("width", this.endXPos - this.startXPos);


    visual.append(this.note);
  }


  getStartXPos() {
    const recordingStartTime = this.recording.startTime;
    this.startXPos = (this.startTime - recordingStartTime) * 10;
  }

  getYPos() {
    const { keys } = this.recording.keyboard;
    const { visual } = this.recording;
    const notes = keys.map(key => key.note);

    let pos =  notes.indexOf(this.key.note);
    pos = pos === 0 ? pos + 0.1 : pos;
    this.yPos = visual.height() * (pos / keys.length);
    // debugger
    // console.log("test")
  }

  getEndPos() {
    const { totalElapsedTime } = this.recording.timer;
    const canvasStartTime = this.recording.startTime;

    this.endTime = totalElapsedTime;
    this.endXPos = (totalElapsedTime - canvasStartTime) * 10;
  }

  play() {
    const { totalElapsedTime, timerRunning } = this.recording.timer;
    const startPlayTimeOffset = (this.startTime - totalElapsedTime  ) * 1000;
    const endPlayTimeOffset = (this.endTime - this.startTime) * 1000;
    var interval;

    interval = setTimeout(() => {
      if (totalElapsedTime > this.startTime) {
        const seek = totalElapsedTime - this.startTime;
        this.key.startPlay(seek);
      } else {
          this.key.startPlay();
      }

      setTimeout(() => {
        this.key.endPlay();
        this.recording.soundByteQueue.pop();
      }, endPlayTimeOffset);
    }, startPlayTimeOffset);

    this.recording.soundByteQueue.push(interval);

  }
}
