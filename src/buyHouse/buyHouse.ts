import Game from '../Game/Game';
import cells from '../cells/cells';
import { createElement, appendElementTo, removeChildsFromElement } from '../helpFunctions/helpFunctions';
import { changeMoneyOnPlayerCard, setStreetRent, isPlayerHaveEnoughMoney } from '../dialogWindow/dialogWindow';
import initHistoryWindow from '../histiryWindow/historyWindow';
import Property from '../ifacies/Property';
import Street from '../Street/Street';
import Cell from '../Cell/Cell';
import { makeAllButtonsInactiveExceptPressed, makeAllButtonsActive } from '../inactiveButton/inactiveButton';

function setFinishBuyHouseButton(): void {
  const currentLanguage: string = localStorage.getItem('language');
  const buyHouseButton: HTMLElement = document.querySelector('.button__buy-house');
  if (currentLanguage === 'EN') {
    buyHouseButton.innerText = 'Finish buying';
  } else if (currentLanguage === 'RU') {
    buyHouseButton.innerText = 'Завершить покупку';
  } else if (currentLanguage === 'BEL' ) {
    buyHouseButton.innerText = 'Завяршыць куплю';
  }
}

function setBuyHouseButton(): void {
  const currentLanguage: string = localStorage.getItem('language');
  const buyHouseButton: HTMLElement = document.querySelector('.button__buy-house');
  if (currentLanguage === 'EN') {
    buyHouseButton.innerText = 'Buy houses';
  } else if (currentLanguage === 'RU') {
    buyHouseButton.innerText = 'Купить дома';
  } else if (currentLanguage === 'BEL') {
    buyHouseButton.innerText = 'Купіць дамы';
  }
}

function highlightActivePlayerCells(event: any): void {
  if (event.target.innerText === 'Buy houses' || event.target.innerText === 'Купить дома' || event.target.innerText === 'Купіць дамы') {
    Game.cells.forEach((cell: Property) => {
      if (Game.activePlayer.property.includes(cell) && cell.isAvailableToBuyHouse) {
        cell.element.addEventListener('click', addHouse);
      } else {
        cell.element.querySelector('.players-container').classList.add('dark');
      }
    });
    setFinishBuyHouseButton();
    makeAllButtonsInactiveExceptPressed(event.target);
  } else {
    makeAllButtonsActive();
    setBuyHouseButton();
    Game.cells.forEach((cell: Property) => {
      cell.element.querySelector('.players-container').classList.remove('dark');
      cell.element.removeEventListener('click', addHouse);
    });
  }
}

function isAvailableToBuyAnotherOneHouse(currentObjCell: Street): boolean {
  const playerPropertiesAvailableToBuyHose = Game.activePlayer.property
    .filter((property: Street) => property.kitId === currentObjCell.kitId);
  let result = true;
  playerPropertiesAvailableToBuyHose.forEach((property: Street) => {
    if (currentObjCell !== property && currentObjCell.numberOfHouses > property.numberOfHouses) {
      result = false;
    }
    if (currentObjCell.numberOfHouses === 4 && property.isThereHotel) {
      result = true;
    }
    if (currentObjCell.isThereHotel) {
      result = false;
    }
  });
  return result;
}

function generateMessageToHistory(currentObjCell: Street): void {
  const currentLanguage: string = localStorage.getItem('language') || 'EN';
  if (currentObjCell.isThereHotel) {
    if (currentLanguage === 'EN') {
      initHistoryWindow(`bought hotel on ${currentObjCell.name} for $${currentObjCell.houseCost}`);
    } else if (currentLanguage === 'RU') {
      initHistoryWindow(`купил(a) отель по улице ${currentObjCell.russianName} за $${currentObjCell.houseCost}`);
    } else if (currentLanguage === 'BEL') {
      initHistoryWindow(`купіў(ла) гатэль па вуліцы ${currentObjCell.belarusianName} за $${currentObjCell.houseCost}`);
    }      
  } else {
    if (currentLanguage === 'EN') {
      initHistoryWindow(`bought house on ${currentObjCell.name} for $${currentObjCell.houseCost}`);
    } else if (currentLanguage === 'RU') {
      initHistoryWindow(`купил(а) дом по улице ${currentObjCell.russianName} за $${currentObjCell.houseCost}`);
    } else if (currentLanguage === 'BEL') {
      initHistoryWindow(`купіў(ла) дом па вуліцы ${currentObjCell.belarusianName} за $${currentObjCell.houseCost}`);
    }
  }
}

function addHouse(event: any): void {  
  const cellElement: HTMLElement = event.target.parentNode;
  let currentObjCell: Street;
  cells.forEach((cell) => {
    if (cellElement === cell.element) {
      currentObjCell = <Street>cell;
    }
  });
  if (isAvailableToBuyAnotherOneHouse(currentObjCell) && isPlayerHaveEnoughMoney(Game.activePlayer, currentObjCell.houseCost)) {
    const housePlace: HTMLElement = cellElement.querySelector('.street-color');
    const houseImg: HTMLImageElement = createElement('img', ['house']);
    if (currentObjCell.numberOfHouses === 4) {
      houseImg.src = './images/Hotel.svg';
      removeChildsFromElement(housePlace);
      currentObjCell.numberOfHouses = 0;
      currentObjCell.isThereHotel = true;
    } else {
      houseImg.src = './images/House.svg';
      currentObjCell.numberOfHouses += 1;
    }
    appendElementTo(housePlace, houseImg);
    Game.activePlayer.subtractMoney(currentObjCell.houseCost);
    changeMoneyOnPlayerCard(Game.activePlayer);
    generateMessageToHistory(currentObjCell);    
  }
  setStreetRent(currentObjCell, Game.activePlayer);
}

export function changeBuyHouseLanguage(): void {
  const buyHouseButton: HTMLElement = document.querySelector('.button__buy-house');  
  if (buyHouseButton.innerText === 'Buy houses' || buyHouseButton.innerText === 'Купить дома' || buyHouseButton.innerText === 'Купіць дамы') {
    setBuyHouseButton()
  } else {
    setFinishBuyHouseButton();
  }
}

export default function initBuyHouseButton(): void {
  const buyingSection: HTMLElement = document.querySelector('.buying-section');
  const currentLanguage: string = localStorage.getItem('language') || 'EN';
  let buttonBuyName: string;
  if (currentLanguage === 'EN') {
    buttonBuyName = 'Buy houses';
  } else if (currentLanguage === 'RU') {
    buttonBuyName = 'Купить дома';
  } else if (currentLanguage === 'BEL') {
    buttonBuyName = 'Купіць дамы';
  }  
  const buyHouseButton: HTMLElement = createElement('div', ['button__buy-house', 'button'], buttonBuyName);
  appendElementTo(buyingSection, buyHouseButton);
  buyHouseButton.addEventListener('click', highlightActivePlayerCells);  
}
