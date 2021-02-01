import { getCellObjByPosition } from '../dialogWindow/dialogWindow';
import Game from '../Game/Game';
import Property from '../ifacies/Property';

export default function changeDialogWindowLanguage(): void {
  const dialodWindow: HTMLElement = document.querySelector('.dialog-window');
  if (!dialodWindow.querySelector('.loader')) {  
    const cell: Property = getCellObjByPosition(Game.activePlayer.position);
    const language: string = localStorage.getItem('language');
    const title: HTMLElement = (<HTMLElement>dialodWindow.querySelector('.title'));
    const button: HTMLElement = dialodWindow.querySelector('.button');
    const buttonYes: HTMLElement = dialodWindow.querySelector('.yes');
    const buttonNo: HTMLElement = dialodWindow.querySelector('.no');
    if (title.innerText === 'Сделать ход' || title.innerText === 'Зрабіць ход' || title.innerText === 'Make a move') {
      if (language === 'RU') {
        title.innerText = 'Сделать ход';
        button.innerText = 'Кинуть кубики';
      } else if (language === 'BEL') {
        title.innerText = 'Зрабіць ход';
        button.innerText = 'Кінуць кубікі';
      } else {
        title.innerText = 'Make a move';
        button.innerText = 'Roll Dice';
      }
    } else if (title.innerText === 'Kупить?' || title.innerText === 'Купіць?' || title.innerText === 'Buy?') {
      if (language === 'RU') {
        title.innerText = 'Kупить?';
        buttonYes.innerText = 'Да';
        buttonNo.innerText = 'Нет';
      } else if (language === 'BEL') {
        title.innerText = 'Kупить?';
        buttonYes.innerText = 'Да';
        buttonNo.innerText = 'Нет';
      } else {
        title.innerText = 'Buy?';
        buttonYes.innerText = 'Yes';
        buttonNo.innerText = 'No';
      }
    } else if (title.innerText === `Аренда $${cell.currentRent}` || title.innerText === `Арэнда $${cell.currentRent}` || title.innerText === `The rent is $${cell.currentRent}`) {
      if (language === 'RU') {
        title.innerText = `Аренда $${cell.currentRent}`;
        button.innerText = 'Заплатить';
      } else if (language === 'BEL') {
        title.innerText = `Арэнда $${cell.currentRent}`;
        button.innerText = 'Заплаціць';
      } else {
        title.innerText = `The rent is $${cell.currentRent}`;
        button.innerText = 'Pay';
      }
    } else if (title.innerText === 'Киньте кубики' || title.innerText === 'Кіньце кубікі' || title.innerText === 'Roll dice to know rent') {
      if (language === 'RU') {
        title.innerText = 'Киньте кубики';
        button.innerText = 'Кинуть';
      } else if (language === 'BEL') {
        title.innerText = 'Кіньце кубікі';
        button.innerText = 'Кінуць';
      } else {
        title.innerText = 'Roll dice to know rent';
        button.innerText = 'Roll Dice';
      }
    } else if (title.innerText === `${cell.name} $${cell.cost}` || title.innerText === `${cell.russianName} $${cell.cost}` || title.innerText === `${cell.belarusianName} $${cell.cost}`) {
      if (language === 'RU') {
        title.innerText = `${cell.russianName} $${cell.cost}`
        button.innerText = 'Заплатить';
      } else if (language === 'BEL') {
        title.innerText = `${cell.belarusianName} $${cell.cost}`
        button.innerText = 'Заплаціць';
      } else {
        title.innerText = `${cell.name} $${cell.cost}`
        button.innerText = 'Pay';
      }
    } else {
      if (language === 'RU') {
        title.innerText = 'Закончить ход?';
        button.innerText = 'Да';
      } else if (language === 'BEL') {
        title.innerText = 'Скончыць ход?';
        button.innerText = 'Да';
      } else {
        title.innerText = 'End the turn?';
        button.innerText = 'Yes';
      }
    }
  }
}