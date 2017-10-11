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
  }

  addInstrument(instrumentType) {
    // instrument = new Instrument(instrumentType);
    debugger
    this.instruments.push(instrumentType);
    this.updateKeyboard(instrumentType);
  }

  updateKeyboard(instrumentType) {
    this.keyboard.instrument = instrumentType;
    this.keyboard.updateKeys();
  }

}

export default Dashboard;
