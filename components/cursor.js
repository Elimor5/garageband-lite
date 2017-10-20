export default class Cursor {
  constructor() {
    this.cursor = $('#cursor');
  }

  currentPos() {
    const pos = this.cursor.css("left");
    return parseInt(pos.slice(0,pos.length - 2));
  }

  run() {
    let currentPos = this.currentPos();
    let nextPos = currentPos + 1;

    const pos = this.cursor.css({ left: nextPos});
  }

  reset() {
    this.cursor.css({ left: "0px" });
  }

  seek(pos) {
    this.cursor.css({ left: pos });
  }

}
