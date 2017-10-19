class Ticker {
  constructor(timer) {
    this.timer = timer;
    this.populateDashboardTicker();
    this.addTicks();
  }

  populateDashboardTicker() {
    $('.sound-bytes').append($("<canvas/>", {
      class: "timer-ticker-background",
      id: "timer-ticker"
    }));

    $('.instruments-container').append($("<div/>", {
      class: "timer-ticker-background"
    }));
  }

  addTicks() {
    const timer = $("#timer-ticker");
  }
}

export default Ticker;
