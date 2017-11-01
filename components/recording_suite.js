export default class RecordingSuite {
  constructor() {
    this.recordings = [];
    this.selectedRecording = null;
    this.addRecordSuiteListeners();
  }

  push(el) {
    this.recordings.push(el);
  }

  deleteRecording() {
    $("#delete-recording").on("click",() => {
      debugger
      if (this.selectedRecording) {
        const recordingIdx = this.recordings.indexOf(this.selectedRecording);
        this.recordings.splice(recordingIdx, 1);
        this.selectedRecording.delete();
        this.selectedRecording = null;
      }
    });
  }

  addRecordSuiteListeners() {
    this.deleteRecording();
  }
}
