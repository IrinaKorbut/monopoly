import { newPlayFn } from '../menu/menu';
import { createElement, appendElementTo } from '../../helpFunctions/helpFunctions';
import Game from '../../entities/Game/Game';

export function showWinScreen(): void {
  const currentLanguage: string = localStorage.getItem('language');
  const completion: HTMLElement = document.querySelector('.game-completion');
  completion.innerHTML = '';
  const congratulations: HTMLElement = createElement('div', ['congratulations']);
  const namePlayer: HTMLElement = createElement('div', ['name-player']);
  const newGameBtn: HTMLElement = createElement('div', ['new-play']);
  if (currentLanguage === 'RU') {
    congratulations.innerText = 'Поздравляем!';
    if (Game.activePlayer) {
      namePlayer.innerText = `Игрок ${Game.activePlayer.name} победил!`;
    }
    newGameBtn.textContent = 'Новая игра';
  } else if (currentLanguage === 'BEL') {
    congratulations.innerText = 'Bіншуем!';
    if (Game.activePlayer) {
      namePlayer.innerText = `Гулец ${Game.activePlayer.name} перамог!`;
    }
    newGameBtn.textContent = 'Новая гульня';
  } else {
    congratulations.innerText = 'Congratulations!';
    if (Game.activePlayer) {
      namePlayer.innerText = `Player ${Game.activePlayer.name} won!`;
    }
    newGameBtn.textContent = 'New game';
  }
  appendElementTo(completion, congratulations, namePlayer, newGameBtn);

  const blackout = document.querySelector('#blackout');
  const offOnBlackout = document.querySelector('.blackout');
  if (!offOnBlackout) {
    blackout.classList.toggle('blackout');
  }
  notСompletion();

  newGameBtn.addEventListener('click', () => {
    newPlayFn();
    showWinScreen();
  });
}

export function notСompletion() {
  const completion: HTMLElement = document.querySelector('.game-completion');
  const windowMenu: HTMLElement = document.querySelector('.window-menu');
  if (windowMenu) {
    windowMenu.classList.toggle('window-menu');
    windowMenu.classList.toggle('no-burger-menu');
  }
  completion.classList.toggle('completion');
  completion.classList.toggle('no-window');
}
