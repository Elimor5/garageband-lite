import Keyboard from './components/keyboard';
import LinkedList from './components/linked_list';


class GaragebandLite {
  constructor() {
    this.keyboard = new Keyboard();
    this.keyboard.populateKeys();
    this.song = new LinkedList();
  }
}

window.garagebandLite = new GaragebandLite();

// class Node {
//   constructor(note,prevNode,nextNode) {
//     this.prevNode = prevNode;
//     this.nextNode = nextNode;
//     this.note = note;
//     this.startTime = null;
//     this.endTime = null;
//   }
//
//   setStartTime(time) {
//     this.startTime = time;
//   }
//
//   setEndTime(time) {
//     this.endTime = time;
//   }
//
//
// }
//
//
// var song = window.garagebandLite.song;
//
// for (var i = 1; i < 11; i++) {
// song.append(new Node(i));
// }
