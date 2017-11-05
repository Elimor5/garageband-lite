import Cursor from './cursor';
import Recording from './recording';

class Timer {
  constructor (dashboard){
    this.totalElapsedTime = 0;
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.paused = false;
    this.cursor = new Cursor();
    this.setCurrentTime();
    this.interval = null;
    this.timerRunning = false;
    this.currentRecording = null;
    this.dashboard = dashboard;
    this.addListeners();
  }

  setCurrentTime() {
    this.parseTime();

    let paddedTime = this.padTime(this.milliseconds, this.seconds, this.minutes);
    const { paddedMinute, paddedSecond, paddedMillisecond } = paddedTime;

    $("#timer").text(`${paddedMinute}:${paddedSecond}:${paddedMillisecond}`);
  }

  padTime(milliseconds, seconds, minutes) {
    let paddedMillisecond = milliseconds >= 10 ? milliseconds.toString().slice(0,2) : "0" + milliseconds;
    let paddedSecond = seconds >= 10 ? seconds : "0" + seconds;
    let paddedMinute = minutes >= 10 ? minutes : "0" + minutes;

    return { paddedMillisecond, paddedSecond, paddedMinute };
  }

  parseTime() {
    while (this.milliseconds >= 1000) {
      this.milliseconds -= 1000;
      this.seconds++;
    }

    while (this.seconds >= 60) {
      this.seconds -= 60;
      this.minutes++;
    }
  }

  resetTimer() {
    this.endCurrentRecording();
    this.clearTimer();
    this.stopInterval();
    this.setCurrentTime();
    this.timerRunning = false;
    this.paused = true;
    this.cursor.reset();
  }

  clearTimer() {
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.totalElapsedTime = 0;
  }

  stopInterval() {
    this.clearAllSoundByteQueues();
    window.clearInterval(this.interval);
  }

  clearAllSoundByteQueues() {
    const { recordings } = this.dashboard.recordingSuite;
    recordings.forEach((recording) => {
      let soundByteQueue = recording.soundByteQueue;

      if (soundByteQueue.length > 0) {
        soundByteQueue.forEach((queue) => {
          clearTimeout((queue));
        });
      }
    });
  }

  pauseTimer() {
    this.paused = true;
    if (this.currentRecording) this.endCurrentRecording();
    this.stopInterval();
    this.timerRunning = false;
  }

  seek(time) {
    this.milliseconds = time;
    this.totalElapsedTime = time;
  }

  runTimer() {
    this.interval = setInterval(()=> {
      if (!this.paused) {
        this.setTimeVariables();
        this.cursor.run(this);
        this.setCurrentTime();

        if (this.currentRecording) this.currentRecording.expandCurrentRecording();
        this.expandTicker();

      }
    }, 100);
  }

  setTimeVariables() {
    this.milliseconds += 100;
    this.totalElapsedTime += 0.1;
    this.totalElapsedTime = Math.round(this.totalElapsedTime * 100) / 100;
  }

  updateTimeVariables(offset) {
    const seconds = Math.floor(offset / 10);
    this.milliseconds = (offset % 10) * 100;
    this.seconds = seconds;
    this.totalElapsedTime = offset / 10;
  }

  addListeners() {
    this.toggleRecording();
    this.togglePlay();
    this.controlRecordingsWithKeyboard();

    $("#pause-button").on("click", () => this.pauseTimer());
    $("#stop-button").on("click", () => this.resetTimer());
  }

  toggleRecording() {
    $("#record-button").on("click",() =>{
      this.startRecording();
      }

  );
  }

  togglePlay() {
    $("#play-button").on("click",() =>{
      this.play();
    });
  }

  play() {

    if (this.currentRecording) this.endCurrentRecording();

    if (this.paused) this.paused = false;
    if (!this.timerRunning) this.runTimer();

    this.timerRunning = true;
    this.playRecordings();
  }

  playRecordings() {
    const { recordings } = this.dashboard.recordingSuite;

    recordings.forEach((recording) => {
      if ((this.totalElapsedTime > recording.endTime) || (recording === this.currentRecording) ) {
        return;
      }
      recording.updateAllSoundBytes(this.totalElapsedTime, null, soundByte => soundByte.play());
    });
  }

  expandTicker() {
    if (this.totalElapsedTime > 140) {
      const { ticker } = this.dashboard;
      if (this.totalElapsedTime % 1 === 0) {
        const pixels = this.totalElapsedTime * 10;

        ticker.addTick(pixels);
        $(".sound-bytes").scrollLeft(pixels);
      }
      ticker.expandTickerContainer();
    }
  }

  createNewRecording() {
    this.currentRecording = new Recording(this.dashboard, this.totalElapsedTime);
    this.dashboard.recordingSuite.push(this.currentRecording);
    this.currentRecording.mapRecordingToKeys();
  }

  startRecording() {
    const { dashboard, currentRecording } = this;
    const { instruments } = dashboard;

    if (instruments.length === 0) {
      dashboard.addInstrument("piano");
    }

    if (!currentRecording) {
      this.createNewRecording();

      if (this.paused) this.paused = false;
      if (!this.timerRunning) this.runTimer();
      this.timerRunning = true;

      this.playRecordings();
    }
  }

  endCurrentRecording() {
  if (this.currentRecording) this.currentRecording.endCurrentRecording();
  }

  controlRecordingsWithKeyboard() {
    $(document).on("keypress", (e) => {
      if (e.key === " " && this.timerRunning) {
        e.preventDefault();
        this.pauseTimer();
      } else if ( e.key === " ") {
          e.preventDefault();

          if (e.shiftKey) {
            this.startRecording();
          } else {
            this.play();
          }
      }
    });

  }
}

export default Timer;
