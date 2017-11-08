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
        const { timer, selectedInstrument, dashboard } = copiedRecording;
        recordings.push(copiedRecording);
        this.pasteRecording(copiedRecording, timer.totalElapsedTime * 10);

        copiedRecording.original.visual.removeClass("copied-recording");

        delete copiedRecording.original
        this.copiedRecording = null;
      }
    });
  }

  copyRecording(selectedRecording) {
    const { timer, dashboard, startTime, endTime, nodes, selectedInstrument } = selectedRecording;
    dashboard.updateSelectedInstrument(selectedInstrument);

    const copiedRecording = new Recording(dashboard, startTime);
    const copiedSoundBytes = selectedRecording.dupSoundBytes(copiedRecording);

    copiedRecording.endTime = endTime;
    return copiedRecording;
  }

  pasteRecording(copiedRecording, time) {
    copiedRecording.resizeRecording();
    copiedRecording.setRecordingStartPos(time);
  }

  moveRecording(targetVisual, offset ) {
    this.recordings.forEach((recording) => {
      const { currentRecording } = recording.timer;

      if (recording.visual[0] === targetVisual && !currentRecording) {
        const startTime = recording.startTime * 10;
        let offsetFromStartPos = startTime + offset;
        if (offsetFromStartPos < 0) offsetFromStartPos = 0;

        recording.setRecordingStartPos(offsetFromStartPos);
      }
    });
  }

  addRecordSuiteListeners() {
    this.deleteRecordingListener();
    this.splitRecordingListener();
    this.copyRecordingListener();
    this.pasteRecordingListener();
  }
}
