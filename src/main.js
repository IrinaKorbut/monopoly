import { initWindowCards } from './WindowCard/windowCard';
import diceInit from './dice/dice';
import Game from './Game/Game';
import Player from './Player/Player';

// import cells from './cells/cells';

import './style/style.scss';
import './style/dice.scss';
import './style/field.scss';
import './style/player.scss';

initWindowCards();
diceInit();

export const game = new Game();
export const player = new Player('blue');

game.addPlayer(player);
game.activePlayer = player;
