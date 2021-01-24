import game from '../Game/Game';
import cells from '../cells/cells';
import { createElement, appendElementTo, removeChildsFromElement } from '../helpFunctions/helpFunctions';
import { changeMoneyOnPlayerCard } from '../dialogWindow/dialogWindow';

function highlightActivePlayerCells(playerProperties) {
  playerProperties.forEach((property) => {
    if (property.isAvailableToBuyHouse) {
      property.element.querySelector('.players-container').classList.remove('dark');
    }
  });
}

function isAvailableToBuyAnotherOneHouse(currentObjCell) {
  const playerPropertiesAvailableToBuyHose = game.activePlayer.property
    .filter((property) => property.kitId === currentObjCell.kitId);
  let result = true;
  playerPropertiesAvailableToBuyHose.forEach((property) => {
    if (currentObjCell !== property) {
      if (currentObjCell.numberOfHouses > property.numberOfHouses) {
        result = false;
      }
    }
  });
  return result;
}

function addHouse(eventTarget) {
  const cellElement = eventTarget.target.parentNode;
  let currentObjCell;
  cells.forEach((cell) => {
    if (cellElement === cell.element) {
      currentObjCell = cell;
    }
  });
  if (isAvailableToBuyAnotherOneHouse(currentObjCell)) {
    const housePlace = cellElement.querySelector('.street-color');
    const houseImg = createElement('img', ['house']);
    houseImg.src = './images/House.svg';
    appendElementTo(housePlace, houseImg);
    game.activePlayer.subtractMoney(currentObjCell.houseCost);
    changeMoneyOnPlayerCard(game.activePlayer);
    currentObjCell.numberOfHouses += 1;
  }
}

function createButton(buyingSection, buttonName) {
  removeChildsFromElement(buyingSection);
  const buttonBuyHouse = createElement('div', ['button__buy-house'], buttonName);
  appendElementTo(buyingSection, buttonBuyHouse);
  switch (buttonName) {
    case 'Buy houses':
      buttonBuyHouse.addEventListener('click', () => {
        game.cells.forEach((cell) => {
          cell.element.querySelector('.players-container').classList.add('dark');
        });
        highlightActivePlayerCells(game.activePlayer.property);
        game.activePlayer.property.forEach((property) => {
          if (property.isAvailableToBuyHouse) {
            property.element.addEventListener('click', addHouse);
          }
        });
        createButton(buyingSection, 'Finish buy house');
      });
      break;
    case 'Finish buy house':
      buttonBuyHouse.addEventListener('click', () => {
        game.cells.forEach((cell) => {
          cell.element.querySelector('.players-container').classList.remove('dark');
        });
        game.activePlayer.property.forEach((property) => {
          if (property.isAvailableToBuyHouse) {
            property.element.removeEventListener('click', addHouse);
          }
        });
        createButton(buyingSection, 'Buy houses');
      });
      break;
    default:
      break;
  }
}

export default function initBuyHouseButton() {
  const buyingSection = document.querySelector('.buying-section');
  createButton(buyingSection, 'Buy houses');
}
