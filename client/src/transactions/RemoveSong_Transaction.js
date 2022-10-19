import jsTPS_Transaction from "../common/jsTPS.js";

export default class DeleteSong_Transaction extends jsTPS_Transaction {
  constructor(store, index, song) {
    super();
    this.store = store;
    this.index = index;
    this.song = song;
  }

  doTransaction() {
    this.store.deleteSong(this.index);
  }

  undoTransaction() {
    this.store.undoAddSong(this.index, this.song);
  }
}