import Cell from '../Cell/Cell';
import cells from '../cells/cells';
import Player from '../Player/Player';

class Game {
  readonly cells: Cell[] = cells;
  players: Player[] = [];
  activePlayer: Player;

  addPlayer(player: Player) {
    this.players.push(player);
  }
}

export default new Game();