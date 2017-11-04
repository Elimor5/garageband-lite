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

  deleteRecordingListener() {
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

  splitRecordingListener() {
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

  copyRecordingListener() {
    $("#copy-recording").on("click",() => {
      const { selectedRecording } = this;
      if (selectedRecording) {
        const copiedRecording = this.copyRecording(selectedRecording);
        this.copiedRecording = copiedRecording;
        this.copiedRecording.original = selectedRecording;

        selectedRecording.visual.addClass("copied-recording");
      }
    });
  }

  pasteRecordingListener() {
    $("#paste-recording").on("click",() => {

      const { selectedRecording, copiedRecording, recordings } = this;

      if (copiedRecording) {
        const { timer, selectedInstrument, dashboard, original } = copiedRecording;

        dashboard.updateSelectedInstrument(original.selectedInstrument);
        debugger
        recordings.push(copiedRecording);
        this.pasteRecording(copiedRecording, timer.totalElapsedTime * 10);
        this.copiedRecording = null;
        copiedRecording.original.visual.removeClass("copied-recording");
      }
    });
  }

  copyRecording(selectedRecording) {
    const { timer, dashboard, startTime, endTime, nodes } = selectedRecording;
    const copiedRecording = new Recording(dashboard, startTime);
    const copiedSoundBytes = selectedRecording.dupSoundBytes(copiedRecording);

    copiedRecording.endTime = endTime;
    return copiedRecording;
  }

  pasteRecording(copiedRecording, time) {
    copiedRecording.resizeRecording();
    copiedRecording.setRecordingStartPos(time);
  }

  addRecordSuiteListeners() {
    this.deleteRecordingListener();
    this.splitRecordingListener();
    this.copyRecordingListener();
    this.pasteRecordingListener();
  }
}
