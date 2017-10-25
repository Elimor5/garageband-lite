class Node {
  constructor() {
    this.prevNode = null;
    this.nextNode = null;
  }

  setStartTime(time) {
    this.startTime = time;
  }

  setEndTime(time) {
    this.endTime = time;
  }


}

export default Node;
