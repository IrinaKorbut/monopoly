import { initWindowCards } from './WindowCard/windowCard';
import roll from './dice/dice';
import { startWindow } from './StartWindow/startWindow';
// import cells from './cells/cells';

import renderPlayerCard from './playerCards/renderPlayerCard';
import addPlayerToField from './addPlayerToField/addPlayerToField'
import initHistoryWindow from './histiryWindow/historyWindow'
import initBuyHouseButton from './buyHouse/buyHouse'


import './style/style.scss';
import './style/dice.scss';
import './style/dialogWindow.scss';
import './style/field.scss';
import './style/historyWindow.scss';
import './style/player.scss';
import './StartWindow/startWindow.scss';
import './style/playerCards.scss';
import './menu/menu.scss';
import './style/constants.scss';
import './style/scrollBar.scss';
import './style/buyingSection.scss';

initWindowCards();

startWindow();


// export const player = new Player('#2295FF');
// Game.addPlayer(player);
// Game.activePlayer = player;
// Game.activePlayer.position = 6;
// for (let i = 0; i < Game.cells.length; i += 1) {
//   if (Game.cells[i].name === 'Vermont Avenue' || Game.cells[i].name === 'Connecticut Avenue') {
//     player.addProperty(Game.cells[i]);
//   }
// }
// showDialogWindow('roll');
// const player1 = new Player('#2295FF', 'player1');
// const player2 = new Player('#2295FF', 'player2');
// Game.addPlayer(player1);
// Game.addPlayer(player2);
// Game.activePlayer = player1;
// console.log(Game);
// setNextPlayerAsActive();
// console.log(Game);
// setNextPlayerAsActive();
// console.log(Game);
// setNextPlayerAsActive();
roll();

//initHistoryWindow('do something');

// initBuyHouseButton();

