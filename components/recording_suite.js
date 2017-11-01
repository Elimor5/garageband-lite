import Recording from './recording';

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
      if (this.selectedRecording) {
        const recordingIdx = this.recordings.indexOf(this.selectedRecording);
        this.recordings.splice(recordingIdx, 1);
        this.selectedRecording.delete();
        this.selectedRecording = null;
      }
    });
  }

  splitRecording() {
    $("#split-recording").on("click", () => {

      const { selectedRecording } = this;

      if (selectedRecording) {
        // const { timer, dashboard } = selectedRecording;
        // const time = timer.totalElapsedTime;
        // const newRecording = new Recording(dashboard, time);
        //
        // selectedRecording.splitNodes(time, newRecording);
        // this.recordings.push(newRecording);
        selectedRecording.removeAllSoundBytePositionVisuals(selectedRecording.startTime);
      }
    });
  }

  addRecordSuiteListeners() {
    this.deleteRecording();
    this.splitRecording();
  }
}
