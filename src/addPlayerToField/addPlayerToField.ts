import Game from '../entities/Game/Game';
import { createElement, appendElementTo } from '../helpFunctions/helpFunctions';
import Player from '../entities/Player/Player';

function renderPlayerToken(player: Player, playerContainer: HTMLElement) {
  const playerToken = createElement('div', ['player'], player.name[0].toUpperCase());
  playerToken.style.background = player.color;
  player.chip = playerToken;
  appendElementTo(playerContainer, playerToken);
}

export default function addPlayerToField() {
  const { players } = Game;
  const startContainer = <HTMLElement>document.querySelector('.go').lastElementChild;
  players.forEach((player) => {
    renderPlayerToken(player, startContainer);
  });
}
