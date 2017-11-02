import Recording from './recording';

export default class RecordingSuite {
  constructor() {
    this.recordings = [];
    this.selectedRecording = null;
    this.copiedRecording = null;
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
        this.selectedRecording.deleteVisual();
        this.selectedRecording = null;
        this.copiedRecording = null;
      }
    });
  }

  splitRecording() {
    $("#split-recording").on("click", () => {
      const { selectedRecording } = this;

      if (selectedRecording) {
        const { timer, dashboard } = selectedRecording;
        const time = timer.totalElapsedTime;
        const newRecording = new Recording(dashboard, time);

        selectedRecording.removeAllSoundBytePositionVisuals();

        selectedRecording.splitNodes(time, newRecording);
        this.recordings.push(newRecording);


        this.selectedRecording.resizeRecording();
        newRecording.resizeRecording();
      }
    });
  }

  copyRecording() {
    $("#copy-recording").on("click",() => {
      const { selectedRecording } = this;
      if (selectedRecording) {
        const { timer, dashboard, startTime, endTime, nodes } = selectedRecording;
        const copiedRecording = new Recording(dashboard, startTime);
        const copiedSoundBytes = selectedRecording.dupSoundBytes(copiedRecording);

        copiedRecording.endTime = endTime;
        this.copiedRecording = copiedRecording;

        selectedRecording.visual.addClass("copied-recording");
      }
    });
  }

  pasteRecording() {
    $("#paste-recording").on("click",() => {

      const { selectedRecording, copiedRecording, recordings } = this;

      if (selectedRecording && copiedRecording) {
        const { timer } = selectedRecording;

        recordings.push(copiedRecording);
        copiedRecording.resizeRecording();
        copiedRecording.setRecordingStartPos(timer.totalElapsedTime * 10);
        this.copiedRecording = null;
        selectedRecording.visual.removeClass("copied-recording");
      }
    });
  }

  addRecordSuiteListeners() {
    this.deleteRecording();
    this.splitRecording();
    this.copyRecording();
    this.pasteRecording();
  }
}
