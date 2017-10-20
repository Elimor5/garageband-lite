export default class Recording {
  constructor(dashboard, startTime) {
    this.keyboard = dashboard.keyboard;
    this.selectedInstrument = dashboard.selectedInstrument;
    this.timer = dashboard.timer;
    this.startTime = startTime;
    this.endTime = null;
  }

}
