import { initWindowCards } from './WindowCard/windowCard';
import roll from './dice/dice';
import { startWindow } from './StartWindow/startWindow';
// import cells from './cells/cells';

import renderPlayerCard from './playerCards/renderPlayerCard';
import addPlayerToField from './addPlayerToField/addPlayerToField'


import './style/style.scss';
import './style/dice.scss';
import './style/dialogWindow.scss';
import './style/field.scss';
import './style/historyWindow.scss';
import './style/player.scss';
import './StartWindow/startWindow.scss';
import './style/playerCards.scss';
import './style/constants.scss';

initWindowCards();

startWindow();
roll();
