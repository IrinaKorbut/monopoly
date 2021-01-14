import { initWindowCards } from './WindowCard/windowCard';
import showDialogWindow from './dialogWindow/dialogWindow';
import diceInit from './dice/dice';
import Game from './Game/Game';
import Player from './Player/Player';

import './style/style.scss';
import './style/dice.scss';
import './style/dialogWindow.scss';
import './style/field.scss';
import './style/player.scss';

initWindowCards();
diceInit();

export const player = new Player('#2295FF');

Game.addPlayer(player);
Game.activePlayer = player;
showDialogWindow('roll');
