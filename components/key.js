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
    const keyDiv =  $(`<div id=${this.note} class="${sharpkey} ${pianoKey}">
                        <span class="key-label">${this.keyboardChar}</span>
                       </div>`);

    keyDiv.on("mousedown", (e) => {
      e.stopPropagation();
      this.sound.play();
      keyDiv.addClass("opacity");
      console.log(this.note);
    });
    return keyDiv;
  }

  setAudio() {
    const note = this.note.slice(0,1).toUpperCase();
    const sharp = (this.note[this.note.length-1] === "#") ? "s" : "";
    const octave = this.note[1] === "2" ? this.octave + 1 : this.octave;
    this.sound = new Audio (`./assets/piano_samples/${octave}${note}${sharp}.mp3`);
  }
}
export default Key;
