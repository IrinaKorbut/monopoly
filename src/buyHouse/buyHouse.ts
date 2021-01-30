import game from '../Game/Game';
import cells from '../cells/cells';
import { createElement, appendElementTo, removeChildsFromElement } from '../helpFunctions/helpFunctions';
import { changeMoneyOnPlayerCard, setStreetRent, isPlayerHaveEnoughMoney } from '../dialogWindow/dialogWindow';
import initHistoryWindow from '../histiryWindow/historyWindow';
import Property from '../ifacies/Property';
import Street from '../Street/Street';
import Cell from '../Cell/Cell';

function highlightActivePlayerCells(playerProperties: Street[]): void {
  playerProperties.forEach((property: Street) => {
    if (property.isAvailableToBuyHouse) {
      property.element.querySelector('.players-container').classList.remove('dark');
    }
  });
}

function isAvailableToBuyAnotherOneHouse(currentObjCell: Street): boolean {
  const playerPropertiesAvailableToBuyHose = game.activePlayer.property
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

function addHouse(eventTarget: any): void {
  const currentLanguage: string = localStorage.getItem('language') || 'EN';
  const cellElement: HTMLElement = eventTarget.target.parentNode;
  let currentObjCell: Street;
  cells.forEach((cell) => {
    if (cellElement === cell.element) {
      currentObjCell = <Street>cell;
    }
  });
  if (isAvailableToBuyAnotherOneHouse(currentObjCell) && isPlayerHaveEnoughMoney(game.activePlayer, currentObjCell.houseCost)) {
    console.log(game.activePlayer.money)
    console.log(currentObjCell.houseCost)
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
    game.activePlayer.subtractMoney(currentObjCell.houseCost);
    changeMoneyOnPlayerCard(game.activePlayer);
    if (currentObjCell.isThereHotel) {
      if (currentLanguage === 'EN') {
        initHistoryWindow(`bought hotel on ${currentObjCell.name} for $${currentObjCell.houseCost}`);
      } else if (currentLanguage === 'RU') {
        initHistoryWindow(`Купил отель по улице ${currentObjCell.russianName} за $${currentObjCell.houseCost}`);
      } else if (currentLanguage === 'BEL') {
        initHistoryWindow(`Купіў гатэль па вуліцы ${currentObjCell.belarusianName} за $${currentObjCell.houseCost}`);
      }      
    } else {
      if (currentLanguage === 'EN') {
        initHistoryWindow(`bought house on ${currentObjCell.name} for $${currentObjCell.houseCost}`);
      } else if (currentLanguage === 'RU') {
        initHistoryWindow(`Купил дом по улице ${currentObjCell.russianName} за $${currentObjCell.houseCost}`);
      } else if (currentLanguage === 'BEL') {
        initHistoryWindow(`Купіў дом па вуліцы ${currentObjCell.belarusianName} за $${currentObjCell.houseCost}`);
      }
    }
  }
  setStreetRent(currentObjCell, game.activePlayer);
}

function createButton(buyingSection: HTMLElement , buttonKind: string, buttonName: string, currentLanguage?: string): void {
  let buttonBuyName: string;
  let buttonFinishBuyName: string;
  if (currentLanguage === 'EN') {
    buttonBuyName = 'Buy houses';
    buttonFinishBuyName = 'Finish buy house';
  } else if (currentLanguage === 'RU') {
    buttonBuyName = 'Купить дома';
    buttonFinishBuyName = 'Завершить покупку';
  } else if (currentLanguage === 'BEL') {
    buttonBuyName = 'Купіць дамы';
    buttonFinishBuyName = 'Завяршыць куплю';
  }
  removeChildsFromElement(buyingSection);
  const buttonBuyHouse: HTMLElement = createElement('div', ['button__buy-house'], buttonName);
  appendElementTo(buyingSection, buttonBuyHouse);
  switch (buttonKind) {
    case 'Buy houses':
      if (game.activePlayer.isHuman) {
        buttonBuyHouse.addEventListener('click', () => {
          game.cells.forEach((cell: Cell) => {
            cell.element.querySelector('.players-container').classList.add('dark');
          });
          highlightActivePlayerCells(<Street[]>game.activePlayer.property);
          game.activePlayer.property.forEach((property: Property) => {
            if (property.isAvailableToBuyHouse) {
              property.element.addEventListener('click', addHouse);
            }
          });
          createButton(buyingSection, 'Finish buy house', buttonFinishBuyName, localStorage.getItem('language'));
        });
      }
      break;
    case 'Finish buy house':
      if (game.activePlayer.isHuman) {
        buttonBuyHouse.addEventListener('click', () => {
          game.cells.forEach((cell: Cell) => {
            cell.element.querySelector('.players-container').classList.remove('dark');
          });
          game.activePlayer.property.forEach((property: Property) => {
            if (property.isAvailableToBuyHouse) {
              property.element.removeEventListener('click', addHouse);
            }
          });
          createButton(buyingSection, 'Buy houses', buttonBuyName, localStorage.getItem('language'));
        });
      }
      break;
    default:
      break;
  }
  if (!game.activePlayer.isHuman) {
    buttonBuyHouse.classList.add('inactive');
  }
}

export default function initBuyHouseButton(): void {
  const currentLanguage: string = localStorage.getItem('language') || 'EN';
  let buttonBuyName: string;
  if (currentLanguage === 'EN') {
    buttonBuyName = 'Buy houses';
  } else if (currentLanguage === 'RU') {
    buttonBuyName = 'Купить дома';
  } else if (currentLanguage === 'BEL') {
    buttonBuyName = 'Купіць дамы';
  }
  const buyingSection: HTMLElement = document.querySelector('.buy-house-wrapper'); 
  createButton(buyingSection, 'Buy houses', buttonBuyName, currentLanguage);
}
