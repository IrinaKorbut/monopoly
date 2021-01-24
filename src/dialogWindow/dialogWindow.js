import { createElement, appendElementTo, removeChildsFromElement } from '../helpFunctions/helpFunctions';
import roll from '../dice/dice';
import movePlayer from '../move_player/movePlayerFn';
import game from '../Game/Game';
import computerMove from '../computerRival/computerRival';

export default function showDialogWindow(action) {
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
          changeMoneyOnPlayerCard(game.activePlayer);
          const ownerLine = cell.element.querySelector('.owner');
          ownerLine.style.backgroundColor = game.activePlayer.color;
          if (cell.type === 'street') {
            setStreetRent(cell, game.activePlayer);
          } else if (cell.type === 'railroad') {
            setRailroadRent(game.activePlayer);
          } else {
            setCommunalRent(cell, game.activePlayer);
          }
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
      if (cell.type !== 'communal') {
        title = createElement('p', ['title'], `The rent is $${cell.currentRent}`);
        const payRentButton = createElement('div', ['button'], 'Pay');
        if (isPlayerHaveEnoughMoney(game.activePlayer, cell.currentRent)) {
          payRentButton.addEventListener('click', () => {
            game.activePlayer.money -= cell.currentRent;
            changeMoneyOnPlayerCard(game.activePlayer);
            cell.owner.addMoney(cell.currentRent);
            changeMoneyOnPlayerCard(cell.owner);
            showDialogWindow();
          });
          appendElementTo(dialogWindowSection, title, payRentButton);
        } else {
          payRentButton.classList.add('inactive');
          const subtitle = createElement('p', ['subtitle'], `You are short $${cell.currentRent - game.activePlayer.money}`);
          appendElementTo(dialogWindowSection, title, subtitle, payRentButton);
        }
      } else {
        title = createElement('p', ['title'], 'Roll dice to know rent');
        const rollDiceButton = createElement('div', ['button'], 'Roll Dice');
        rollDiceButton.addEventListener('click', () => {
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
            removeChildsFromElement(dialogWindowSection);
            let rent = roll();
            rent = isColorSet(cell.owner, cell) ? rent * 10 : rent * 4;
            title = createElement('p', ['title'], `The rent is $${rent}`);
            const payRentButton = createElement('div', ['button'], 'Pay');
            if (isPlayerHaveEnoughMoney(game.activePlayer, rent)) {
              payRentButton.addEventListener('click', () => {
                game.activePlayer.money -= rent;
                changeMoneyOnPlayerCard(game.activePlayer);
                cell.owner.addMoney(rent);
                changeMoneyOnPlayerCard(cell.owner);
                showDialogWindow();
              });
              appendElementTo(dialogWindowSection, title, payRentButton);
            } else {
              payRentButton.classList.add('inactive');
              const subtitle = createElement('p', ['subtitle'], `You are short $${rent - game.activePlayer.money}`);
              appendElementTo(dialogWindowSection, title, subtitle, payRentButton);
            }
          });
        });
        appendElementTo(dialogWindowSection, title, rollDiceButton);
      }
      break;
    case 'tax':
      // проработать случай с нехваткой денег
      title = createElement('p', ['title'], `${cell.name} $${cell.cost}`);
      const payTaxButton = createElement('div', ['button'], 'Pay');
      payTaxButton.addEventListener('click', () => {
        game.activePlayer.subtractMoney(cell.cost);
        changeMoneyOnPlayerCard(game.activePlayer);
        showDialogWindow();
      });
      appendElementTo(dialogWindowSection, title, payTaxButton);
      break;
    default:
      title = createElement('p', ['title'], 'End of turn');
      const endButton = createElement('div', ['button'], 'End');
      endButton.addEventListener('click', () => {
        setNextPlayerAsActive();
        if (game.activePlayer.isHuman) {
          showDialogWindow('roll');
        } else {
          showDialogWindow('wait');
          computerMove('roll');
        }
      });
      appendElementTo(dialogWindowSection, title, endButton);
  }
}

export function addPropertyToPlayer(player, property) {
  player.addProperty(property);
  player.subtractMoney(property.cost);
  property.owner = game.activePlayer;
}

export function getCellObjByPosition(position) {
  for (let i = 0; i < game.cells.length; i += 1) {
    const cell = game.cells[i];
    if (cell.position === position) {
      return cell;
    }
  }
}

export function isPlayerHaveEnoughMoney(player, price) {
  return player.money >= price;
}

export function setStreetRent(property, player) {
  if (isColorSet(player, property)) {
    for (let i = 0; i < player.property.length; i += 1) {
      const playerProperty = player.property[i];
      if (playerProperty.kitId === property.kitId) {
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

export function setCommunalRent(property, player) {
  if (isColorSet(player, property)) {
    for (let i = 0; i < player.property.length; i += 1) {
      const playerProperty = player.property[i];
      if (playerProperty.kitId === property.kitId) {
        const rent = playerProperty.element.querySelector('.cost');
        rent.innerText = 'x10';
      }
    }
  } else {
    const rent = property.element.querySelector('.cost');
    rent.innerText = 'x4';
  }
}

export function setRailroadRent(player) {
  let railroadCounter = 0;
  player.property.forEach((propery) => {
    if (propery.type === 'railroad') {
      railroadCounter += 1;
    }
  });
  player.property.forEach((propery) => {
    if (propery.type === 'railroad') {
      propery.currentRent = railroadCounter;
      const rent = propery.element.querySelector('.cost');
      rent.innerText = `$${propery.currentRent}`;
    }
  });
}

function setAvailableToBuyHouse(player, purchaseProperty) {
  const allPlayerProperties = player.property;
  allPlayerProperties.filter((property) => property.kitId === purchaseProperty.kitId)
    .map((property) => {
      property.isAvailableToBuyHouse = true;
    });
}

export function isColorSet(player, purchaseProperty) {
  let sameKitPropertyCounter = 0;
  for (let i = 0; i < player.property.length; i += 1) {
    const playerProperty = player.property[i];
    if (playerProperty.kitId === purchaseProperty.kitId) {
      sameKitPropertyCounter += 1;
    }
  }
  if (sameKitPropertyCounter === purchaseProperty.kitSize) {
    setAvailableToBuyHouse(player, purchaseProperty);
    return true;
  }
  return false;
}

export function setNextPlayerAsActive() {
  const activePlayerIndex = game.players.indexOf(game.activePlayer);
  if (activePlayerIndex < game.players.length - 1) {
    game.activePlayer = game.players[activePlayerIndex + 1];
  } else {
    game.activePlayer = game.players[0];
  }
}

export function changeMoneyOnPlayerCard(player) {
  const playerCardMoney = player.playerCard.querySelector('.player-card__cash__money');
  playerCardMoney.innerText = player.money;
}
