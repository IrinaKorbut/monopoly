import { initWindowCards } from './WindowCard/windowCard';
import diceInit from './dice/dice';
import showDialogWindow from './dialogWindow/dialogWindow';
import Game from './Game/Game';
import Player from './Player/Player';

import './style/style.scss';
import './style/dice.scss';
import './style/dialogWindow.scss';
import './style/field.scss';
import './style/player.scss';

diceInit();
initWindowCards();

const game = new Game();
const player = new Player('#11A85A');
player.position = 6;
game.addPlayer(player);
game.activePlayer = player;

showDialogWindow(game, 'tax');
// console.log(player);
