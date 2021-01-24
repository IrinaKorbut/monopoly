import { createElement, appendElementTo } from '../helpFunctions/helpFunctions';
import Game from '../Game/Game';

export default function initHistoryWindow(action) {
  // const btn = document.querySelector('.button');  //закоменти

  const list = document.querySelector('.action-list');

  /* две строки снизу раскоменти */
  appendElementTo(list, createElement('li', ['action'], `${Game.activePlayer.name}: ${action}`));
  list.scrollTop = list.scrollHeight;

/* три строки снизу закоменти */
  // btn.addEventListener('click', () => {
  //   appendElementTo(list, createElement('li', ['action'], `${Game.activePlayer.name}: ${action}`));
  //   list.scrollTop = list.scrollHeight;
  // });
}
