import Timer from './timer';
import Instrument from './instrument';
import InstrumentsModal from './instruments_modal';
import Ticker from './ticker';
import RecordingSuite from './recording_suite';


class Dashboard {
  constructor(keyboard) {
    this.timer = new Timer(this);
    this.instruments = [];
    this.modal = new InstrumentsModal();
    this.modal.populateModal(this.addInstrument.bind(this));
    this.keyboard = keyboard;
    this.selectedInstrument = null;
    this.recordingSuite = new RecordingSuite();
    this.ticker = new Ticker(this.timer);
  }

  addInstrument(instrumentType) {
    const id = this.instruments.length;
    const newInstrument = new Instrument(id, instrumentType, this);
    newInstrument.addEventListener(this.updateSelectedInstrument.bind(this));

    this.instruments.push(newInstrument);
    this.updateKeyboard(instrumentType);
    this.updateSelectedInstrument(newInstrument);
  }

  updateSelectedInstrument(instrument) {
    let whiteBorder = '1px solid white';
    let blueBorder = "1px solid #ADD8E6";

    this.clearSelectedBorders(whiteBorder);

    this.selectedInstrument = instrument;

    this.updateKeyboard(instrument.instrumentType);

    this.selectedInstrument.instrumentLabel.css({backgroundColor: "#ADD8E6", border: blueBorder, zIndex: 1 });
    this.selectedInstrument.soundByteContainer.css({ border: blueBorder, zIndex: 1 });
  }

  clearSelectedBorders(whiteBorder) {
    if (this.selectedInstrument) {
      let { instrumentLabel, soundByteContainer } = this.selectedInstrument;

      instrumentLabel.css({backgroundColor: '', border: whiteBorder, zIndex: 0});
      soundByteContainer.css({ border: whiteBorder, zIndex: 0});
    }
  }

  updateKeyboard(instrumentType) {
    this.keyboard.instrument = instrumentType;
    this.keyboard.updateKeys();
  }


}

export default Dashboard;
