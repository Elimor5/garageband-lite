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
    const { ctx } = this.recording;
    debugger
    ctx.moveTo(this.startXPos,this.yPos);
    ctx.lineTo(this.endXPos, this.yPos);
    ctx.strokeStyle = '#f1f1f1';
    ctx.stroke();
  }


  getStartXPos() {
    const soundByteStartTime = this.startTime;
    const recordingStartTime = this.recording.startTime;

    this.startXPos = (soundByteStartTime - recordingStartTime) * 10;
  }

  getYPos() {
    const { keys } = this.recording.keyboard;
    const { canvas } = this.recording;
    const notes = keys.map(key => key.note);
    let pos =  notes.indexOf(this.key.note);
    pos = pos === 0 ? pos + 0.1 : pos;

    this.yPos = canvas[0].height / keys.length * pos;
  }

  getEndPos() {
    const { totalElapsedTime } = this.recording.timer;
    const canvasStartTime = this.recording.startTime;

    this.endTime = totalElapsedTime;
    this.endXPos = (totalElapsedTime - canvasStartTime) * 10;

  }
}
