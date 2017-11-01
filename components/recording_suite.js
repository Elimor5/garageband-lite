export default class RecordingSuite {
  constructor() {
    this.recordings = [];
    this.selectedRecording = null;
  }

  push(el) {
    this.recordings.push(el);
  }
}
