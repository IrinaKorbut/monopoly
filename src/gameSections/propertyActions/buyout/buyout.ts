import Property from '../../../entities/ifacies/Property';
import { createElement, appendElementTo } from '../../../helpFunctions/helpFunctions';
import Game from '../../../entities/Game/Game';
import { changeMoneyOnPlayerCard, isPlayerHaveEnoughMoney } from '../../dialogWindow/dialogWindow';
import initHistoryWindow from '../../histiryWindow/historyWindow';
import { makeAllButtonsActive, makeAllButtonsInactiveExceptPressed } from '../../../inactiveButton/inactiveButton';
import lockPayOrBuyBtnIfNotEnoughMoney from '../../dialogWindow/payOrBuyButtonAccess/lockPayOrBuyButton';

function setFinishBuyoutBtnText(): void {
  const language: string = localStorage.getItem('language');
  const pladgeBtn: HTMLElement = document.querySelector('.button__buyout');
    if (language === 'RU') {
      pladgeBtn.innerText = 'Закончить выкуп';
    } else if (language === 'BEL') {
      pladgeBtn.innerText = 'Скончыць выкуп';
    } else {
      pladgeBtn.innerText = 'Finish boyout';
    }
}

function setBuyoutBtnText(): void {
  const language: string = localStorage.getItem('language');
  const pladgeBtn: HTMLElement = document.querySelector('.button__buyout');
  if (language === 'RU' || language === 'BEL') {
    pladgeBtn.innerText = 'Выкуп';
  } else {
    pladgeBtn.innerText = 'Buyout';
  }
}

export function changeBuyoutBtnLanguage(): void {
  const pladgeBtn: HTMLElement = document.querySelector('.button__buyout');
  if (pladgeBtn.innerText === 'Buyout' || pladgeBtn.innerText === 'Выкуп') {
    setBuyoutBtnText();
  } else {
    setFinishBuyoutBtnText();
  }
}

function getStringBuyoutAction(property: Property): string {
  const language: string = localStorage.getItem('language');
  if (language === 'RU') {
    return ` выкупил(а) ${property.russianName} за $${property.redemptionPrice}`;
  } else if (language === 'BEL') {
    return ` выкупіў(ла) ${property.belarusianName} за $${property.redemptionPrice}`;
  } else {
    return ` bought out ${property.name} for $${property.redemptionPrice}`;
  }
}

function buyoutProperty(event: any): void {
  let cellElement: HTMLElement;
  if (event.target.classList.contains('players-container')) {
    cellElement = event.target.parentNode;
  } else {
    cellElement = event.target.parentNode.parentNode;
  }
  console.log(cellElement);
  let currentObjCell: Property;
  Game.cells.forEach((cell) => {
    if (cellElement === cell.element) {
      currentObjCell = <Property>cell;
    }
  });
  if (isPlayerHaveEnoughMoney(Game.activePlayer, currentObjCell.redemptionPrice)) {
    currentObjCell.element.removeEventListener('click', buyoutProperty);
    currentObjCell.element.querySelector('.players-container').classList.add('dark');
    currentObjCell.isPredge = false;
    Game.activePlayer.money -= currentObjCell.redemptionPrice;
    changeMoneyOnPlayerCard(Game.activePlayer);
    currentObjCell.element.querySelector('.lock').removeEventListener('click', buyoutProperty);
    (<HTMLElement>currentObjCell.element.querySelector('.lock')).style.display = 'none';
    initHistoryWindow(getStringBuyoutAction(currentObjCell));
    lockPayOrBuyBtnIfNotEnoughMoney();
  }
}


function buyoutBtnEvent(event: any): void {
  if (event.target.innerText === 'Buyout' || event.target.innerText === 'Выкуп') {
    Game.cells.forEach((cell: Property) => {
      if (Game.activePlayer.property.includes(cell) && cell.isPredge) {
        cell.element.addEventListener('click', buyoutProperty);
        cell.element.querySelector('.lock').addEventListener('click', buyoutProperty);
      } else {
        cell.element.querySelector('.players-container').classList.add('dark');
      }
    });
    setFinishBuyoutBtnText();
    makeAllButtonsInactiveExceptPressed(event.target);
  } else {
    Game.cells.forEach((cell: Property) => {
      cell.element.querySelector('.players-container').classList.remove('dark');
      cell.element.removeEventListener('click', buyoutProperty);
    });
    setBuyoutBtnText();
    makeAllButtonsActive();
  }
}

export default function initBuyoutBtn(): void {
  const buyingSection: HTMLElement = document.querySelector('.buying-section');
  let btnInnerText: string; 
  const language: string = localStorage.getItem('language');
  if (language === 'RU' || language === 'BEL') {
    btnInnerText = 'Выкуп';
  } else {
    btnInnerText = 'Buyout';
  }
  const buyoutBtn: HTMLElement = createElement('div', ['button__buyout', 'button'], btnInnerText);
  buyoutBtn.addEventListener('click', buyoutBtnEvent);
  appendElementTo(buyingSection, buyoutBtn);
}