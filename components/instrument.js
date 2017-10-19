class Instrument {
  constructor(id,instrumentType) {
    this.id = id;
    this.instrumentType = instrumentType;
    this.soundByteContainer = "";
    this.instrumentLabel = "";
    this.createVisual();
  }

  createVisual() {
      this.createContainers();
      this.populateInstrumentSelector();
      this.populateSoundByteContainer();
  }

  createContainers() {
    this.soundByteContainer = $('<div/>', {
      id: `${this.instrumentType}-${this.id}-soundByte`,
      class: "sound-byte-container"
    });

    this.instrumentLabel = $('<div/>', {
      id: `${this.instrumentType}-${this.id}-label`,
      class: "instrument-label",
    });
  }

  populateInstrumentSelector() {
    $('.instruments-container').append(this.instrumentLabel);

    this.instrumentLabel.append($('<div/>', {
      class: "instrument-label-image-container"
    }));

    $('.instrument-label-image-container').append($('<div/>',{
      class: `${this.instrumentType}-image`
    }));

    this.instrumentLabel.append($('<div/>',{
      class: "instrument-label-title-container",
    }));

    $('.instrument-label-title-container').append($('<div/>',{
      class: "instrument-label-title",
      text: this.instrumentType[0].toUpperCase() + this.instrumentType.slice(1)
    }));

  }

  populateSoundByteContainer() {
    $('.sound-bytes').append(this.soundByteContainer);
  }

  addInstrument() {
    $(".instrument-selector");
  }
}

export default Instrument;
