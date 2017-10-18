class Instrument {
  constructor(id,instrumentType) {
    this.id = id;
    this.instrumentType = instrumentType;
    this.soundByteContainer = $('<div/>', {
      id: `${this.instrumentType}-${this.id}-soundByte`,
      class: "sound-byte-container"
    });
    this.instrumentLabel = $('<div/>', {
      id: `${this.instrumentType}-${this.id}-label`,
      class: "instrument-label",
    });
    this.createVisual();
  }

  createVisual() {
      this.populateInstrumentSelector();
      this.populateSoundByteContainer();
    $('#timer');
  }

  populateInstrumentSelector() {
    $('.instruments-container').append(this.instrumentLabel);

    this.instrumentLabel.append($('<div/>', {
      id: `${this.instrumentType}-label-image`,
      class: "instrument-label-image"
    }))

    .append($('<div/>', {
      class: "instrument-label-image",

    }));

    this.instrumentLabel.append($('<p/>',{
      class: "instrument-label-title",
      text: this.instrumentType
    }));

    // .insertBefore($('.dashboard-labels'));
  }

  populateSoundByteContainer() {
    $('.sound-bytes').append(this.soundByteContainer);
  }

  addInstrument() {
    $(".instrument-selector");
  }
}

export default Instrument;
