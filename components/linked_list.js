import Node from './node';

class LinkedList {
  constructor() {
    this.head = new Node("head");
    this.tail = new Node("tail");
    this.head.nextNode = this.tail;
    this.tail.prevNode = this.head;
    this.nodes = [this.head, this.tail];
  }

  append(node) {
    const lastNode = this.tail.prevNode;

    node.prevNode = lastNode;
    node.nextNode = this.tail;
    this.tail.prevNode = node;
    lastNode.nextNode = node;
    this.nodes.push(node);
  }

  find(time, node) {
    if (!node) node = this.head;

    if (time > node. startTime && time < node.endTime) {
      return node;
    } else if (node.startTime > time) {
      return node;
    } else if (node === this.tail) {
        return -1;
    } else {
      return this.find(time,node.nextNode);
    }
  }

  delete(note) {
    const node = this.find(note);

    if (node === -1) {
      return -1;
    } else {
      const prevNode = node.prevNode;
      const nextNode = node.nextNode;

      prevNode.nextNode = nextNode;
      nextNode.prevNode = prevNode;
    }
  }

  returnList(node) {
    const currentList = [];

    if (!node) {
      node = this.head;
    }

    currentList.push(node);

    if (node === this.tail) {
      return currentList;
    } else {
      return currentList.concat(this.returnList(node.nextNode));
    }

  }

  updateAllSoundBytes(time, soundByte, callback) {
    if (!soundByte) {
      soundByte = this.find(time);
    } else if (soundByte === this.head) {
      return this.updateAllSoundBytes(time, soundByte.nextNode, callback);
    } else if (soundByte === this.tail || soundByte === -1) {
      return;
    }
    
    callback(soundByte);
    return this.updateAllSoundBytes(time,soundByte.nextNode, callback);
  }

  splitNodes(time, newList) {
    const firstListLastNode = this.tail.prevNode;
    const splitNode = this.find(time);
    const newlastNode = splitNode.prevNode;

    //reset first list's tail
    newlastNode.nextNode = this.tail;
    this.tail.prevNode = newlastNode;

    //set splitNode to new list
    newList.head.nextNode = splitNode;
    splitNode.prevNode = newList.head;

    //set end of split nodes to end of new list
    firstListLastNode.nextNode = newList.tail;
    newList.tail.prevNode = firstListLastNode;

    // split nodes into respective recording arrays
    const splitNodeIdx = this.nodes.indexOf(splitNode);
    const originalListNodes = this.nodes.slice(0, splitNodeIdx);
    const newListNodes = this.nodes.slice(splitNodeIdx);

    this.nodes = originalListNodes;
    newList.nodes = newList.nodes.concat(newListNodes);

    //update start && endtimes
    newList.endTime = this.endTime;
    this.endTime = time;
    newList.startTime = time;
  }

  // updateVisual( endTime) {
  //
  // }
}

export default LinkedList;
