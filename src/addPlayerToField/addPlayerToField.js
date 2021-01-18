import Game from '../Game/Game';
import { createElement, appendElementTo } from '../helpFunctions/helpFunctions';

function renderPlayerToken(player, playerContainer) {
  const playerToken = createElement('div', ['player'], player.name[0]);
  playerToken.style.background = player.color;
  player.chip = playerToken;
  appendElementTo(playerContainer, playerToken);
}
export default function addPlayerToField() {
  const { players } = Game;
  const startContainer = document.querySelector('.go').lastElementChild;
  players.forEach((player) => {
    renderPlayerToken(player, startContainer);
  });
}
