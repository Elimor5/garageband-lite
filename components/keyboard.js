import Key from './key';

class Keyboard {
  constructor() {
    this.keys = [];
    this.notes = ['c','d','e','f','g','a','b','c2','d2','e2'];
    this.sharpNotes = ["c","d","f","g","a","c2","d2"];

    this.keyboardChars = "asdfghjkl;".split("");
    this.sharpChars = "wetyuop".split("");
    this.instrument = 'piano';
    this.octave = 3;
    this.dashboard = null;
  }

  populateKeys() {
    for (let i = 0; i < this.notes.length; i++ ) {
      let key = new Key(this.notes[i], this.octave, this.keyboardChars[i]);
      $("#keyboard").append(key.renderNote());
      this.keys.push(key);

      this.populateSharpKeys(key.note);
    }
  }

  populateSharpKeys(note) {
    if (this.sharpNotes.includes(note)) {
      let sharpNoteIndex = this.sharpNotes.indexOf(note);
      let sharpKey = new Key(`${note}#`, this.octave, this.sharpChars[sharpNoteIndex]);
      let currentKey = $(`#${note}`);

      currentKey.append(sharpKey.renderNote("sharp"));
      this.keys.push(sharpKey);
      currentKey.addClass('sharp-key-holder');
    }
  }

  updateKeys() {
    this.keys.forEach((key) => {
      key.octave = this.octave;
      key.setAudio(this.instrument);
    });
  }
}

export default Keyboard;
