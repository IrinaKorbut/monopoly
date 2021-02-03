import { createElement } from '../../helpFunctions/helpFunctions';
import Game from '../../entities/Game/Game';

export default function changeLanguageOnWinScreen(): void {
  if (document.querySelector('.congratulations')) {
    const currentLanguage: string = localStorage.getItem('language');
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
  }
}
