import { changeMoneyOnPlayerCard } from '../dialogWindow/dialogWindow';
import Game from '../Game/Game';
import { appendElementTo, createElement } from '../helpFunctions/helpFunctions';
import Property from '../ifacies/Property';

function pledgeProperty(event: any): void {
  const cellElement: HTMLElement = event.target.parentNode;
  let currentObjCell: Property;
  Game.cells.forEach((cell) => {
    if (cellElement === cell.element) {
      currentObjCell = <Property>cell;
    }
  });
  //cellElement.classList.add('pledged');
  currentObjCell.element.removeEventListener('click', pledgeProperty);
  currentObjCell.element.querySelector('.players-container').classList.add('dark');
  currentObjCell.isPredge = true;
  Game.activePlayer.money += currentObjCell.pledgePrice;
  changeMoneyOnPlayerCard(Game.activePlayer);
  const lockImg: HTMLElement = createElement('img', ['lock']);
  lockImg.setAttribute('src', './images/lock1.svg');
  appendElementTo(event.target, lockImg);
}

function pledgeBtnEvent(event: any): void {
  if (event.target.innerText === 'Pledge') {
    Game.cells.forEach((cell: Property) => {
      if (Game.activePlayer.property.includes(cell) && !cell.isPredge && (cell.numberOfHouses === 0 || cell.numberOfHouses === undefined)) {
        cell.element.addEventListener('click', pledgeProperty);
      } else {
        cell.element.querySelector('.players-container').classList.add('dark');
      }
    });
    event.target.innerText = 'Finish pledge';
  } else {
    event.target.innerText = 'Pledge';
    Game.cells.forEach((cell: Property) => {
      cell.element.querySelector('.players-container').classList.remove('dark');
      cell.element.removeEventListener('click', pledgeProperty);
    });
  }
}

export default function initPledgeBtn(): void {
  const buyingSection: HTMLElement = document.querySelector('.buying-section');
  const pledgeBtn: HTMLElement = createElement('div', ['button__buy-house'], 'Pledge');
  pledgeBtn.addEventListener('click', pledgeBtnEvent);
  appendElementTo(buyingSection, pledgeBtn);
}