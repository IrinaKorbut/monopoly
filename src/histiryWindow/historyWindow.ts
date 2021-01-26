import { createElement, appendElementTo } from '../helpFunctions/helpFunctions';
import Game from '../Game/Game';

export default function initHistoryWindow(action: string) {
  const list: HTMLElement = document.querySelector('.action-list');
  appendElementTo(list, createElement('li', ['action'], `${Game.activePlayer.name}: ${action}`));
  list.scrollTop = list.scrollHeight;
}
