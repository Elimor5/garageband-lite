class Ticker {
  constructor(timer) {
    this.populateDashboardTicker();
    this.timer = timer;
    this.addTicks();
  }

  populateDashboardTicker() {
    $('.instruments-container').append($("<div/>", {
      class: "timer-ticker-background"
    }));
  }

  addTicks() {
    var c = document.getElementById("timer-ticker");
    var ctx = c.getContext("2d");
    ctx.beginPath();

    for (let i = 0; i < 1400; i+=10) {
      if (i % 50 === 0) {
        let minutes = 0;
        let seconds = i / 10;
        let parsedTime = this.parseTime(seconds, minutes);
        let paddedTime = this.timer.padTime(null, parsedTime[0], parsedTime[1]);
        let { paddedSecond, paddedMinute } = paddedTime;

        ctx.font = "10px Arial";
        ctx.strokeText(`${paddedMinute}:${paddedSecond}`,i - 12, c.height - 10);
      }

      ctx.moveTo(i, c.height);
      ctx.lineTo(i, c.height - 5);
      ctx.strokeStyle = '#f1f1f1';
      ctx.stroke();
    }
  }

  parseTime(seconds, minutes) {
    if (seconds >= 60) {
     seconds -= 60;
     minutes ++;
    }
    return [seconds, minutes];
  }


}

export default Ticker;
