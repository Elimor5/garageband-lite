class Instrument {
  constructor(id,instrumentType, dashboard) {
    this.id = id;
    this.instrumentType = instrumentType;
    this.recordingSuite = dashboard.recordingSuite;
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

    this.createDragoverEvent();

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

    $('.instrument-label-image-container').append($('<div/>', {
      class: `${this.instrumentType}-image`
    }));

    this.instrumentLabel.append($('<div/>',{
      class: "instrument-label-title-container",
      id: `instrument-label-title-container-${this.id}`
    }));

    $(`#instrument-label-title-container-${this.id}`).append($('<div/>', {
      class: "instrument-label-title",
      text: this.instrumentType[0].toUpperCase() + this.instrumentType.slice(1)
    }));

  }

  populateSoundByteContainer() {
    $('.sound-bytes-inner').append(this.soundByteContainer);
  }

  addInstrument() {
    $(".instrument-selector");
  }

  addEventListener(updateSelectedInstrument) {
    this.instrumentLabel.on("click", () => {
      updateSelectedInstrument(this);
    });
  }

  createDragoverEvent() {
    this.soundByteContainer[0].ondragend = (e) => {
      e.preventDefault();
      const targetVisual = e.target;
      const offset = e.offsetX;

      this.recordingSuite.moveRecording(targetVisual, offset);
    };
  }
}

export default Instrument;
