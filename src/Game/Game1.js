import cells from '../cells/cells';

class Game {
  constructor() {
    this.players = [];
    this.cells = cells;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  set activePlayer(player) {
    this._activePlayer = player;
  }

  get activePlayer() {
    return this._activePlayer;
  }
}

export default new Game();
