import jsTPS_Transaction from "../common/jsTPS.js";

export default class AddSong_Transaction extends jsTPS_Transaction {
  constructor(store, index) {
    super();
    this.store = store;
    this.index = index;
  }

  doTransaction() {
    this.store.addSong();
  }

  undoTransaction() {
    this.store.deleteSong(this.index);
  }
}