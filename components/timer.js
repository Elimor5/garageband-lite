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
    window.clearInterval(this.interval);
  }

  pauseTimer() {
    this.paused = true;
    this.endCurrentRecording();
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
        this.milliseconds += 100;
        this.totalElapsedTime += 0.1;
        this.totalElapsedTime = Math.round(this.totalElapsedTime * 100) / 100;

        this.cursor.run();
        this.setCurrentTime();
        if (this.currentRecording) this.currentRecording.expandCurrentRecording();
      }
    }, 100);
  }

  addListeners() {
    this.toggleRecording();
    this.togglePlay();

    $("#pause-button").on("click", () => this.pauseTimer());
    $("#stop-button").on("click", () => this.resetTimer());
  }

  toggleRecording() {
    $("#record-button").on("click",() =>{
      this.createNewRecording();

      if (this.paused) this.paused = false;
      if (!this.timerRunning) this.runTimer();

      this.timerRunning = true;
    });
  }

  togglePlay() {
    $("#play-button").on("click",() =>{
      // if (dashboard)
      this.endCurrentRecording();

      if (this.paused) this.paused = false;
      if (!this.timerRunning) this.runTimer();

      this.timerRunning = true;
    });
  }

  createNewRecording() {
    this.currentRecording = new Recording(this.dashboard, this.totalElapsedTime);
    this.dashboard.recordingSuite.push(this.currentRecording);
  }

  endCurrentRecording() {
    this.currentRecording.endTime = this.totalElapsedTime;
    this.currentRecording = null;
  }




}

export default Timer;
