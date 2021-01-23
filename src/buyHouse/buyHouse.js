import game from '../Game/Game';
import { createElement, appendElementTo, removeChildsFromElement } from '../helpFunctions/helpFunctions';

function hilightActivePlayerCells() {
  const playerProperties = game.activePlayer.property;
  playerProperties.forEach((property) => {
    console.log('property.element', property.element);
    property.element.querySelector('.players-container').classList.remove('dark');
  });
}

function addHouse(cell) {

}

function createButtonFinishBuyingHouses(buyingSection) {
  removeChildsFromElement(buyingSection);
  const buttonFinishBuyHouse = createElement('div', ['button__buy-house'], 'Finish buy house');
  appendElementTo(buyingSection, buttonFinishBuyHouse);
  buttonFinishBuyHouse.addEventListener('click', () => {
    game.cells.forEach((cell) => {
      cell.element.querySelector('.players-container').classList.remove('dark');
    });
    createButtonBuyingHouses(buyingSection)
  });
}

function createButtonBuyingHouses(buyingSection) {
  removeChildsFromElement(buyingSection);
  const buttonBuyHouse = createElement('div', ['button__buy-house'], 'Buy house');
  appendElementTo(buyingSection, buttonBuyHouse);
  buttonBuyHouse.addEventListener('click', () => {
    game.cells.forEach((cell) => {
      cell.element.querySelector('.players-container').classList.add('dark');
    });
    hilightActivePlayerCells();
    createButtonFinishBuyingHouses(buyingSection);
  });
  
}

export default function initBuyHouseButton() {
  const buyingSection = document.querySelector('.buying-section');
  createButtonBuyingHouses(buyingSection);
}
