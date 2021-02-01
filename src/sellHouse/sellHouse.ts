import Game from '../Game/Game';
import cells from '../cells/cells';
import { createElement, appendElementTo } from '../helpFunctions/helpFunctions';
import { changeMoneyOnPlayerCard, setStreetRent } from '../dialogWindow/dialogWindow';
import initHistoryWindow from '../histiryWindow/historyWindow';
import Property from '../ifacies/Property';
import Street from '../Street/Street';
import { makeAllButtonsInactiveExceptPressed, makeAllButtonsActive } from '../inactiveButton/inactiveButton';
import unlockPayOrBuyBtnIfEnoughMoney from '../payOrBuyButtonAccess/unlockPayOrBuyButton';


function setFinishSellHouseButton(): void {
  const currentLanguage: string = localStorage.getItem('language');
  const sellHouseButton: HTMLElement = document.querySelector('.button__sell-house');
  if (currentLanguage === 'EN') {
    sellHouseButton.innerText = 'Finish selling';
  } else if (currentLanguage === 'RU') {
    sellHouseButton.innerText = 'Завершить продажу';
  } else if (currentLanguage === 'BEL' ) {
    sellHouseButton.innerText = 'Завяршыць продаж';
  }
}

function setSellHouseButton(): void {
  const currentLanguage: string = localStorage.getItem('language');
  const sellHouseButton: HTMLElement = document.querySelector('.button__sell-house');
  if (currentLanguage === 'EN') {
    sellHouseButton.innerText = 'Sell houses';
  } else if (currentLanguage === 'RU') {
    sellHouseButton.innerText = 'Продать дома';
  } else if (currentLanguage === 'BEL') {
    sellHouseButton.innerText = 'Прадаць дамы';
  }
}

function highlightActivePlayerCellsWithHouse(event: any): void {
  if (event.target.innerText === 'Sell houses' || event.target.innerText === 'Продать дома' || event.target.innerText === 'Прадаць дамы') {
    Game.cells.forEach((cell: Property) => {
      if (Game.activePlayer.property.includes(cell) && (cell.numberOfHouses || cell.isThereHotel)) {
        cell.element.addEventListener('click', removeHouse);
      } else {
        cell.element.querySelector('.players-container').classList.add('dark');
      }
    });
    setFinishSellHouseButton();
    makeAllButtonsInactiveExceptPressed(event.target);
  } else {
    makeAllButtonsActive();
    setSellHouseButton();
    Game.cells.forEach((cell: Property) => {
      cell.element.querySelector('.players-container').classList.remove('dark');
      cell.element.removeEventListener('click', removeHouse);
    });
  }
}

function generateMessageToHistory(currentObjCell: Street): void {
  const currentLanguage: string = localStorage.getItem('language') || 'EN';
  if (currentObjCell.numberOfHouses === 4) {
    if (currentLanguage === 'EN') {
      initHistoryWindow(`sold hotel to bank on ${currentObjCell.name} for $${currentObjCell.houseCost * 0.8}`);
    } else if (currentLanguage === 'RU') {
      initHistoryWindow(`продал(a) отель банку по улице ${currentObjCell.russianName} за $${currentObjCell.houseCost * 0.8}`);
    } else if (currentLanguage === 'BEL') {
      initHistoryWindow(`прадаў(ла) гатэль банку па вуліцы ${currentObjCell.belarusianName} за $${currentObjCell.houseCost * 0.8}`);
    }      
  } else {
    if (currentLanguage === 'EN') {
      initHistoryWindow(`sold house to bank on ${currentObjCell.name} for $${currentObjCell.houseCost * 0.8}`);
    } else if (currentLanguage === 'RU') {
      initHistoryWindow(`продал(a) дом банку по улице ${currentObjCell.russianName} за $${currentObjCell.houseCost * 0.8}`);
    } else if (currentLanguage === 'BEL') {
      initHistoryWindow(`прадаў(ла) дом банку па вуліцы ${currentObjCell.belarusianName} за $${currentObjCell.houseCost * 0.8}`);
    }
  }
}




function addFourHouses(housePlace: HTMLElement, currentObjCell: Street): void {
    while (currentObjCell.numberOfHouses !== 4) {
        const houseImg: HTMLImageElement = createElement('img', ['house']);
        houseImg.src = './images/House.svg';
        appendElementTo(housePlace, houseImg);
        currentObjCell.numberOfHouses += 1;
    }   
}

function isAvailableToSellHouse(currentObjCell: Street): boolean {
    const playerPropertiesWithHouses = Game.activePlayer.property
      .filter((property: Street) => property.numberOfHouses || property.isThereHotel);
    let result = !!(playerPropertiesWithHouses.length);
    playerPropertiesWithHouses.forEach((property: Street) => {
      if (currentObjCell !== property) {
        if (currentObjCell.numberOfHouses < property.numberOfHouses && !currentObjCell.isThereHotel) {
            result = false;
        }
        if (!currentObjCell.isThereHotel && property.isThereHotel) {
            result = false;
        }
        if (currentObjCell.numberOfHouses === 0 && !property.isThereHotel) {
            result = false;
        }
        if (currentObjCell.isThereHotel) {
            result = true;
        }
      }      
    });
    return result;
  }

function removeHouse(event: any): void {  
  const cellElement: HTMLElement = event.target.className === 'player' ? event.target.parentNode.parentNode : event.target.parentNode;
  let currentObjCell: Street;
  cells.forEach((cell) => {
    if (cellElement === cell.element) {
      currentObjCell = <Street>cell;
    }
  });
    const housePlace: HTMLElement = cellElement.querySelector('.street-color');
    if (isAvailableToSellHouse(currentObjCell)){
        if (currentObjCell.isThereHotel) {
            housePlace.removeChild(housePlace.lastChild);
            currentObjCell.isThereHotel = !currentObjCell.isThereHotel;
            addFourHouses(housePlace, currentObjCell)
        } else {    
            if (currentObjCell.numberOfHouses) {
                housePlace.removeChild(housePlace.lastChild);
                currentObjCell.numberOfHouses -= 1;
            }  
        }
        Game.activePlayer.addMoney(currentObjCell.houseCost * 0.8);
        changeMoneyOnPlayerCard(Game.activePlayer);
        generateMessageToHistory(currentObjCell);    
        setStreetRent(currentObjCell, Game.activePlayer);
        unlockPayOrBuyBtnIfEnoughMoney();
    }    
}

export function changeSellHouseLanguage(): void {
  const sellHouseButton: HTMLElement = document.querySelector('.button__sell-house');  
  if (sellHouseButton.innerText === 'Sell houses' || sellHouseButton.innerText === 'Продать дома' || sellHouseButton.innerText === 'Прадаць дамы') {
    setSellHouseButton()
  } else {
    setFinishSellHouseButton();
  }
}


export default function initSellHouseButton(): void {
  const buyingSection: HTMLElement = document.querySelector('.buying-section');
  const currentLanguage: string = localStorage.getItem('language') || 'EN';
  let buttonSellName: string;
  if (currentLanguage === 'EN') {
    buttonSellName = 'Sell houses';
  } else if (currentLanguage === 'RU') {
    buttonSellName = 'Продать дома';
  } else if (currentLanguage === 'BEL') {
    buttonSellName = 'Прадаць дамы';
  }  
  const sellHouseButton: HTMLElement = createElement('div', ['button__sell-house', 'button'], buttonSellName);
  appendElementTo(buyingSection, sellHouseButton);
  sellHouseButton.addEventListener('click', highlightActivePlayerCellsWithHouse);  
}
