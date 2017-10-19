import Ticker from './ticker';

class Timer {
  constructor (){
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.paused = false;
    this.setCurrentTime();
    this.interval = null;
    this.timerRunning = false;
    this.addListeners();
    this.ticker = new Ticker();
  }

  setCurrentTime() {
    if (this.milliseconds >= 1000) {
      this.milliseconds -= 1000;
      this.seconds++;
    } else if (this.seconds >= 60) {
      this.seconds -= 60;
      this.minutes ++;
    }

    let paddedMillisecond = this.milliseconds > 10 ? this.milliseconds.toString().slice(0,2) : "0" + this.milliseconds;
    let paddedSecond = this.seconds > 10 ? this.seconds : "0" + this.seconds;
    let paddedMinute = this.minutes > 10 ? this.minutes : "0" + this.minutes;

    $("#timer").text(`${paddedMinute}:${paddedSecond}:${paddedMillisecond}`);
  }

  padTime() {

  }

  resetTimer() {
    this.milliseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.stopInterval();
    this.setCurrentTime();
    this.timerRunning = false;
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
