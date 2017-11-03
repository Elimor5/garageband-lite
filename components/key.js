import SoundByte from './sound_byte';

class Key {
  constructor(note, octave, keyboardChar){
    this.note = note;
    this.octave = octave;
    this.keyboardChar = keyboardChar;
    this.setAudio('piano');
    this.currentRecording = null;
    this.currentSoundByte = null;
    this.soundFileMissing = false;
  }

  renderNote(sharp){
    const sharpkey = sharp ? "sharp-key" : "";
    const pianoKey = sharp ? "" : "piano-key";
    this.keyDiv =  $(`<div id=${this.note} class="${sharpkey} ${pianoKey}">
                        <span class="key-label">${this.keyboardChar.toUpperCase()}</span>
                       </div>`);
    this.addListener(this.keyDiv,"mouse", this.startPlay, this.endPlay);
    this.addListener($(document),"key", this.startPlay, this.endPlay);
    return this.keyDiv;
  }

  addListener(element,listener, startFunc, endFunc) {
    const currentKeyChar = this.keyboardChar;
    const recording = this.currentRecording;

    startFunc = startFunc.bind(this);
    endFunc = endFunc.bind(this);

    element.on(`${listener}down`, (e) => {
      e.stopPropagation();
      if (listener === "mouse" || e.key === currentKeyChar) {
        if (this.currentRecording && !this.currentSoundByte && !this.soundFileMissing) {
          this.currentSoundByte = new SoundByte(this, this.currentRecording);
        }
        startFunc();
      }
    });

    element.on(`${listener}up`, (e) => {
      e.stopPropagation();

      if (listener === "mouse" || e.key === currentKeyChar) {
        if (this.currentRecording && !this.soundFileMissing) {
          this.currentSoundByte.getEndPos();
          this.currentSoundByte.drawLine();
          this.currentSoundByte = null;

        }

        endFunc();
      }
    });
  }

  startPlay() {
    if (!this.soundFileMissing) {
      this.sound.play();
      this.keyDiv.addClass("opacity");
    }
  }

  endPlay() {
    if (!this.soundFileMissing) {
      this.sound.load();
      this.keyDiv.removeClass("opacity");
    }
  }

  setAudio(instrument) {
    const note = this.note.slice(0,1).toUpperCase();
    const sharp = (this.note[this.note.length-1] === "#") ? "s" : "";
    const octave = this.note[1] === "2" ? this.octave + 1 : this.octave;
    const url = `assets/${instrument}_samples/${octave}${note}${sharp}.mp3`;
    this.soundFileMissing = false;
    
    this.sound = new Audio (url);

    const key = this;
    this.sound.onerror = (err) => {
      key.soundFileMissing = true;
    };
  }
}
export default Key;
