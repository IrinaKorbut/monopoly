import { changeMoneyOnPlayerCard } from '../../dialogWindow/dialogWindow';
import Game from '../../../entities/Game/Game';
import { appendElementTo, createElement } from '../../../helpFunctions/helpFunctions';
import Property from '../../../entities/ifacies/Property';
import initHistoryWindow from '../../histiryWindow/historyWindow';
import { makeAllButtonsActive, makeAllButtonsInactiveExceptPressed } from '../../../inactiveButton/inactiveButton';
import unlockPayOrBuyBtnIfEnoughMoney from '../../dialogWindow/payOrBuyButtonAccess/unlockPayOrBuyButton';

function setPledgeBtnText(): void {
  const language: string = localStorage.getItem('language');
  const pladgeBtn: HTMLElement = document.querySelector('.button__pladge');
  if (language === 'RU') {
    pladgeBtn.innerText = 'Залог';
  } else if (language === 'BEL') {
    pladgeBtn.innerText = 'Заклад';
  } else {
    pladgeBtn.innerText = 'Pledge';
  }
}

function setFinishPledgeBtnText(): void {
  const language: string = localStorage.getItem('language');
  const pladgeBtn: HTMLElement = document.querySelector('.button__pladge');
  if (language === 'RU') {
    pladgeBtn.innerText = 'Остановить залог';
  } else if (language === 'BEL') {
    pladgeBtn.innerText = 'Спыніць заклад';
  } else {
    pladgeBtn.innerText = 'Finish pledge';
  }
}

export function changePledgeBtnLanguage(): void {
  const pladgeBtn: HTMLElement = document.querySelector('.button__pladge');
  if (pladgeBtn.innerText === 'Pledge' || pladgeBtn.innerText === 'Залог' || pladgeBtn.innerText === 'Заклад') {
    setPledgeBtnText();
  } else {
    setFinishPledgeBtnText();
  }
}

function getStringPledgeAction(property: Property): string {
  const language: string = localStorage.getItem('language');
  if (language === 'RU') {
    return ` заложил(а) ${property.russianName} за $${property.pledgePrice}`;
  } if (language === 'BEL') {
    return ` заклаў(ла) ${property.belarusianName} за $${property.pledgePrice}`;
  }
  return ` pledged ${property.name} for $${property.pledgePrice}`;
}

function pledgeProperty(event: any): void {
  let cellElement: HTMLElement;
  if (event.target.className === 'player') {
    cellElement = event.target.parentNode.parentNode;
  } else {
    cellElement = event.target.parentNode;
  }
  let currentObjCell: Property;
  Game.cells.forEach((cell) => {
    if (cellElement === cell.element) {
      currentObjCell = <Property>cell;
    }
  });
  currentObjCell.element.removeEventListener('click', pledgeProperty);
  currentObjCell.element.querySelector('.players-container').classList.add('dark');
  currentObjCell.isPredge = true;
  Game.activePlayer.money += currentObjCell.pledgePrice;
  changeMoneyOnPlayerCard(Game.activePlayer);
  (<HTMLElement>cellElement.querySelector('.lock')).style.display = 'inline-block';
  initHistoryWindow(getStringPledgeAction(currentObjCell));
  unlockPayOrBuyBtnIfEnoughMoney();
}

function pledgeBtnEvent(event: any): void {
  if (event.target.innerText === 'Pledge' || event.target.innerText === 'Залог' || event.target.innerText === 'Заклад') {
    Game.cells.forEach((cell: Property) => {
      if (Game.activePlayer.property.includes(cell) && !cell.isPredge
      && (cell.numberOfHouses === 0 || cell.numberOfHouses === undefined)) {
        cell.element.addEventListener('click', pledgeProperty);
      } else {
        cell.element.querySelector('.players-container').classList.add('dark');
      }
    });
    setFinishPledgeBtnText();
    makeAllButtonsInactiveExceptPressed(event.target);
  } else {
    makeAllButtonsActive();
    setPledgeBtnText();
    Game.cells.forEach((cell: Property) => {
      cell.element.querySelector('.players-container').classList.remove('dark');
      cell.element.removeEventListener('click', pledgeProperty);
    });
  }
}

export default function initPledgeBtn(): void {
  const buyingSection: HTMLElement = document.querySelector('.buying-section');
  let btnInnerText: string;
  const language: string = localStorage.getItem('language');
  if (language === 'RU') {
    btnInnerText = 'Залог';
  } else if (language === 'BEL') {
    btnInnerText = 'Заклад';
  } else {
    btnInnerText = 'Pledge';
  }
  const pledgeBtn: HTMLElement = createElement('div', ['button__pladge', 'button'], btnInnerText);
  pledgeBtn.addEventListener('click', pledgeBtnEvent);
  appendElementTo(buyingSection, pledgeBtn);
}
