import Keyboard from './components/keyboard';

class GaragebandLite {
  constructor() {
    this.keyboard = new Keyboard();
    this.keyboard.populateKeys();
  }
}


new GaragebandLite();
