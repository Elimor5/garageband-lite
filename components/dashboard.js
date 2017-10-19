import Timer from './timer';
import Instrument from './instrument';
import InstrumentsModal from './instruments_modal';

class Dashboard {
  constructor(keyboard) {
    this.timer = new Timer();
    this.instruments = [];
    this.modal = new InstrumentsModal();
    this.modal.populateModal(this.addInstrument.bind(this));
    this.keyboard = keyboard;
    this.selectedInstrument = [];
  }

  addInstrument(instrumentType) {
    const id = this.instruments.length;
    const newInstrument = new Instrument(id, instrumentType);
    this.instruments.push(newInstrument);
    this.updateKeyboard(instrumentType);
    this.updateSelectedInstrument(newInstrument);
  }

  updateSelectedInstrument(instrument) {
    this.selectedInstrument = instrument;
  }

  updateKeyboard(instrumentType) {
    this.keyboard.instrument = instrumentType;
    this.keyboard.updateKeys();
  }

}

export default Dashboard;
