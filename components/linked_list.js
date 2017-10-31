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
}

export default LinkedList;
