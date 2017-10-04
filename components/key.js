class Key {
  constructor(note, octave, keyboardChar){
    this.note = note;
    this.octave = octave;
    this.keyboardChar = keyboardChar;
    this.setAudio();
  }

  renderNote(sharp){
    const sharpkey = sharp ? "sharp-key" : "";
    const pianoKey = sharp ? "" : "piano-key";
    this.keyDiv =  $(`<div id=${this.note} class="${sharpkey} ${pianoKey}">
                        <span class="key-label">${this.keyboardChar.toUpperCase()}</span>
                       </div>`);
    this.addListener(this.keyDiv,"mouse");
    this.addListener($(document),"key");
    return this.keyDiv;
  }

  addListener(element,listener) {
    const currentKeyChar = this.keyboardChar;
    const currentKey = this;

    element.on(`${listener}down`, (e) => {
      e.stopPropagation();

      if (listener === "mouse" || e.key === currentKeyChar) {
        this.sound.play();
        currentKey.keyDiv.addClass("opacity");
      }
    });

    element.on(`${listener}up`, (e) => {
      e.stopPropagation();

      if (listener === "mouse" || e.key === currentKeyChar) {
        this.sound.load();
        currentKey.keyDiv.removeClass("opacity");
      }
    });
  }

  setAudio() {
    const note = this.note.slice(0,1).toUpperCase();
    const sharp = (this.note[this.note.length-1] === "#") ? "s" : "";
    const octave = this.note[1] === "2" ? this.octave + 1 : this.octave;
    this.sound = new Audio (`assets/piano_samples/${octave}${note}${sharp}.mp3`);
  }
}
export default Key;
