class Ticker {
  constructor(timer) {
    this.populateDashboardContainers();
    this.timer = timer;
    this.populateTicker(0, 1400);
    this.addEventListener();
    this.length = 1400;
  }

  populateDashboardContainers() {
    $('.sound-bytes-inner').append($('<div/>', {
      id: "timer-ticker",
    }));

    $('.instruments-container').append($("<div/>", {
      class: "timer-ticker-background"
    }));
  }

  populateTicker(start, end) {
    const ticker = $("#timer-ticker");

    for (let i = start; i < end + 1; i+=10) {
      if (i % 50 === 0 && i != 0) {
        let minutes = 0;
        let seconds = i / 10;

        let parsedTime = this.parseTime(seconds, minutes);
        let paddedTime = this.timer.padTime(null, parsedTime[0], parsedTime[1]);
        let { paddedSecond, paddedMinute } = paddedTime;
      }

      this.addTick(i);
    }
  }

  addTick(time) {
    const leftPos = time;
    const ticker = $("#timer-ticker");
    const newTick = $('<div/>', {
      class:"tick",
    });
    newTick.css("left", `${leftPos}px`);

    this.addTickTime(time);

    ticker.append(newTick);
  }

  addTickTime(time) {
    if ( time % 50 === 0 && time != 0) {

      let minutes = 0;
      let seconds = time / 10;

      let parsedTime = this.parseTime(seconds, minutes);
      let paddedTime = this.timer.padTime(null, parsedTime[0], parsedTime[1]);
      let { paddedSecond, paddedMinute } = paddedTime;

      const tickTime = $('<div/>', {
        class: "tick-time",
        text: `${paddedMinute}:${paddedSecond}`
      });


      tickTime.css("left", `${time - 10}px`);
      $("#timer-ticker").append(tickTime);
    }
  }


  parseTime(seconds, minutes) {
    while (seconds >= 60) {
     seconds -= 60;
     minutes ++;
    }
    return [seconds, minutes];
  }

  addEventListener() {
    const ticker = $("#timer-ticker");
    let { setCurrentTime, cursor, clearTimer } = this.timer;
    setCurrentTime = setCurrentTime.bind(this.timer);
    clearTimer = clearTimer.bind(this.timer);

    ticker.on("click",(e) => {
      e.stopPropagation();
      debugger
      let offset = e.offsetX //- 23;
      console.log("offset " + offset);
      console.log("e.screenX " + e.screenX);
      clearTimer();
      const seconds = Math.floor(offset / 10);
      this.timer.seconds = seconds;
      this.timer.totalElapsedTime = offset / 10;
      setCurrentTime();
      cursor.seek(offset);
    });
  }

  expandTickerContainer() {
    const width = $("#timer-ticker").css("width");
    let widthInt = parseInt(width.slice(0, width.length-2));
    widthInt++;

    $("#timer-ticker").css("width", widthInt);
    $(".sound-bytes-inner").css("width",widthInt);
  }


}

export default Ticker;
