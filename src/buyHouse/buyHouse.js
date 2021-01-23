import game from '../Game/Game';
import { createElement, appendElementTo, removeChildsFromElement } from '../helpFunctions/helpFunctions';

function highlightActivePlayerCells(playerProperties) {
  playerProperties.forEach((property) => {
    property.element.querySelector('.players-container').classList.remove('dark');
  });
}

function addHouse(eventTarget) {
  const housePlace = eventTarget.target.parentNode.querySelector('.street-color');
  const houseImg = createElement('img', ['house']);
  houseImg.src = './images/House.svg';
  appendElementTo(housePlace, houseImg);
}

function createButton(buyingSection, buttonName) {
  removeChildsFromElement(buyingSection);
  const buttonBuyHouse = createElement('div', ['button__buy-house'], buttonName);
  appendElementTo(buyingSection, buttonBuyHouse);
  const playerProperties = game.activePlayer.property;
  switch (buttonName) {
    case 'Buy houses':
      buttonBuyHouse.addEventListener('click', () => {
        game.cells.forEach((cell) => {
          cell.element.querySelector('.players-container').classList.add('dark');
        });
        highlightActivePlayerCells(playerProperties);
        game.activePlayer.property.forEach((property) => {
          property.element.addEventListener('click', addHouse);
        });
        createButton(buyingSection, 'Finish buy house');
      });
      break;
    case 'Finish buy house':
      buttonBuyHouse.addEventListener('click', () => {
        game.cells.forEach((cell) => {
          cell.element.querySelector('.players-container').classList.remove('dark');
        });
        playerProperties.forEach((property) => {
          property.element.removeEventListener('click', addHouse);
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
