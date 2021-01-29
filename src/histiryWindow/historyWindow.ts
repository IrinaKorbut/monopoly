import { createElement, appendElementTo } from '../helpFunctions/helpFunctions';
import Game from '../Game/Game';

export default function initHistoryWindow(action: string) {
  const list: HTMLElement = document.querySelector('.action-list');
  const listItem: HTMLElement = createElement('li', ['action'], '');
  const player: HTMLElement = createElement('span', ['action__player-name'], Game.activePlayer.name);
  player.style.color = Game.activePlayer.color;
  appendElementTo(listItem, player, createElement('span', ['message'], ` ${action}`));
  appendElementTo(list, listItem);
  list.scrollTop = list.scrollHeight;
}
