import Key from './key';

class Keyboard {
  constructor() {
    this.keys = [];
    this.notes = ['c','d','e','f','g','a','b','c2','d2','e2'];
    this.keyboardChars = "asdfghjkl;".split("");
    this.sharpChars = "wetyuop".split("");
    this.instrument = 'piano';
    this.octave = 3;
  }

  populateKeys() {
    for (let i = 0; i < this.notes.length; i++ ) {
      let key = new Key(this.notes[i], this.octave, this.keyboardChars[i]);
      $("#keyboard").append(key.renderNote());
      this.keys.push(key);
    }

    let sharpCharsIndex = 0;
    Array.from($(".piano-key")).map((key) => {
      const sharps = ["c","d","f","g","a","c2","d2"];
      let note = key.id;

      if (sharps.includes(note)) {
        let sharpKey = new Key(`${note}#`, this.octave, this.sharpChars[sharpCharsIndex]);
        let currentKey = $(`#${key.id}`);
        sharpCharsIndex++;

        currentKey.append(sharpKey.renderNote("sharp"));
        currentKey.addClass('sharp-key-holder');

      }
    });
  }

  updateKeys() {
    this.keys.forEach((key) => {
      key.octave = this.octave;
      key.setAudio(this.instrument);
    });
  }
}

export default Keyboard;
