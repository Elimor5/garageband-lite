export default class Cursor {
  constructor() {
    this.cursor = $('#cursor');
  }

  run(timer) {

    let currentTime = timer.totalElapsedTime * 10;

    const pos = this.cursor.css({ left: currentTime});
  }

  reset() {
    this.cursor.css({ left: "0px" });
  }

  seek(pos) {
    this.cursor.css({ left: pos });
  }

}
