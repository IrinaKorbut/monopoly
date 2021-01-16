import { createElement, appendElementTo, removeChildsFromElement } from '../helpFunctions/helpFunctions';
import roll from '../dice/dice';
import movePlayer from '../move_player/movePlayerFn';
import game from '../Game/Game';

export default function showDialogWindow(action) {
 // console.log(game.activePlayer);
  let title;
  const cell = getCellObjByPosition(game.activePlayer.position);
  const dialogWindowSection = document.querySelector('.dialog-window');
  removeChildsFromElement(dialogWindowSection);
  switch (action) {
    case 'wait':
      const img = createElement('img');
      img.setAttribute('src', './images/dollar-coin.svg');
      appendElementTo(dialogWindowSection, img);
      break;
    case 'roll':
      title = createElement('p', ['title'], `${game.activePlayer.name} move`);
      const rollButton = createElement('div', ['button'], 'Roll Dice');
      rollButton.addEventListener('click', () => {
        showDialogWindow('wait');
        const p = new Promise((resolve) => {
          let test;
          setTimeout(() => {
            test = setInterval(roll, 200);
          }, 0);
          setTimeout(() => {
            clearInterval(test);
            resolve();
          }, 3000);
        });
        p.then(() => {
          movePlayer(roll());
        });
      });
      appendElementTo(dialogWindowSection, title, rollButton);
      break;
    case 'buy':
      title = createElement('p', ['title'], 'Free property');
      const buttonsWrapper = createElement('div', ['buttons-wrapper']);
      const buttonYes = createElement('div', ['button', 'yes'], 'Buy');
      const buttonNo = createElement('div', ['button', 'no'], 'Don\'t buy');
      buttonNo.addEventListener('click', () => {
        showDialogWindow();
      });
      appendElementTo(buttonsWrapper, buttonYes, buttonNo);
      if (isPlayerHaveEnoughMoney(game.activePlayer, cell.cost)) {
        buttonYes.addEventListener('click', () => {
          addPropertyToPlayer(game.activePlayer, cell);
          const ownerLine = cell.element.querySelector('.owner');
          ownerLine.style.backgroundColor = game.activePlayer.color;
          setRent(cell, game.activePlayer);
          // // change color
          // const ownerLine = cell.element.querySelector('.owner');
          // ownerLine.style.backgroundColor = game.activePlayer.color;
          // // set rent
          // const rent = cell.element.querySelector('.cost');
          // rent.innerText = `$${cell.rent}`;
          // cell.currentRent = cell.rent;
          // // end of turn
          showDialogWindow();
        });
        buttonNo.addEventListener('click', () => {
          showDialogWindow();
        });
        appendElementTo(dialogWindowSection, title, buttonsWrapper);
      } else {
        buttonYes.classList.add('inactive');
        const subtitle = createElement('p', ['subtitle'], `You are short $${cell.cost - game.activePlayer.money}`);
        appendElementTo(dialogWindowSection, title, subtitle, buttonsWrapper);
      }
      break;
    case 'rent':
      title = createElement('p', ['title'], 'The rent is $1000');
      const payRentButton = createElement('div', ['button'], 'Pay');
      payRentButton.addEventListener('click', () => {
        // do some magic
      });
      appendElementTo(dialogWindowSection, title, payRentButton);
      break;
    case 'tax':
      title = createElement('p', ['title'], `${cell.name} $${cell.cost}`);
      const payTaxButton = createElement('div', ['button'], 'Pay');
      payTaxButton.addEventListener('click', () => {
        game.activePlayer.subtractMoney(cell.cost);
        showDialogWindow();
      });
      appendElementTo(dialogWindowSection, title, payTaxButton);
      break;
    default:
      title = createElement('p', ['title'], 'End of turn');
      const endButton = createElement('div', ['button'], 'End');
      endButton.addEventListener('click', () => {
        setNextPlayerAsActive();
        showDialogWindow('roll');
      });
      appendElementTo(dialogWindowSection, title, endButton);
  }
}

function addPropertyToPlayer(player, property) {
  player.addProperty(property);
  player.subtractMoney(property.cost);
  property.owner = game.activePlayer;
}

function getCellObjByPosition(position) {
  for (let i = 0; i < game.cells.length; i += 1) {
    const cell = game.cells[i];
    if (cell.position === position) {
      return cell;
    }
  }
}

function isPlayerHaveEnoughMoney(player, price) {
  if (player.money >= price) {
    return true;
  }
  return false;
}

function setRent(property, player) {
  if (isColorSet(player, property)) {
    for (let i = 0; i < player.property.length; i += 1) {
      const playerProperty = player.property[i];
      if (playerProperty.kitId === property.kitId) {
        console.log(playerProperty);
        const rent = playerProperty.element.querySelector('.cost');
        rent.innerText = `$${playerProperty.rent * 2}`;
        playerProperty.currentRent = playerProperty.rent * 2;
      }
    }
  } else {
    const rent = property.element.querySelector('.cost');
    rent.innerText = `$${property.rent}`;
    property.currentRent = property.rent;
  }
}

function isColorSet(player, purchaseProperty) {
  let sameKitPropertyCounter = 0;
  for (let i = 0; i < player.property.length; i += 1) {
    const playerProperty = player.property[i];
    if (playerProperty.kitId === purchaseProperty.kitId) {
      sameKitPropertyCounter += 1;
    }
  }
  if (sameKitPropertyCounter === purchaseProperty.kitSize) {
    return true;
  }
  return false;
}

export function setNextPlayerAsActive() {
  const activePlayerIndex = game.players.indexOf(game.activePlayer);
  if (activePlayerIndex < game.players.length - 1) {
    game.activePlayer = game.players[activePlayerIndex + 1];
    console.log(`if`);
    console.log(game);
  } else {
    game.activePlayer = game.players[0];
    console.log(`else`);
    console.log(game);
  }
}
