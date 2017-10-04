class Node {
  constructor(note, startTime, endTime) {
    this.prevNode = null;
    this.nextNode = null;
    this.note = note;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  setStartTime(time) {
    this.startTime = time;
  }

  setEndTime(time) {
    this.endTime = time;
  }


}

export default Node;
