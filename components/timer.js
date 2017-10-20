import Cursor from './cursor';

class Timer {
  constructor (){
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.paused = false;
    this.cursor = new Cursor();
    this.setCurrentTime();
    this.interval = null;
    this.timerRunning = false;
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
    this.clearTimer();
    this.stopInterval();
    this.setCurrentTime();
    this.timerRunning = false;
    this.cursor.reset();
  }

  clearTimer() {
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
  }

  stopInterval() {
    window.clearInterval(this.interval);
  }

  pauseTimer() {
    this.paused = true;
    this.stopInterval();
    this.timerRunning = false;
  }

  seek(time) {
    this.milliseconds = time;
  }

  runTimer() {
    this.interval = setInterval(()=> {
      if (!this.paused) {
        this.milliseconds += 100;
        this.cursor.run();
        this.setCurrentTime();
      }
    }, 100);
  }

  addListeners() {
    $("#record-button").on("click",() =>{
      if (this.paused) this.paused = false;
      if (!this.timerRunning) this.runTimer();

      this.timerRunning = true;
    });

    $("#play-button").on("click",() =>{
      if (this.paused) this.paused = false;
      if (!this.timerRunning) this.runTimer();

      this.timerRunning = true;
    });

    $("#pause-button").on("click", () => this.pauseTimer());
    $("#stop-button").on("click", () => this.resetTimer());
  }

}

export default Timer;
