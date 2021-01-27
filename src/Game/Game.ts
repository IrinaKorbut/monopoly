import Cell from '../Cell/Cell';
import cells from '../cells/cells';
import Player from '../Player/Player';

class Game {
  readonly cells: Array<Cell> = cells;
  players: Array<Player> = [];
  activePlayer: Player;

  addPlayer(player: Player) {
    this.players.push(player);
  }
}

export default new Game();