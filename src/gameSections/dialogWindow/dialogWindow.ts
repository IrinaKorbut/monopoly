import {
  createElement, appendElementTo, removeChildsFromElement, checkIsHuman,
} from '../../helpFunctions/helpFunctions';
import roll from '../dice/dice';
import movePlayer from '../../move_player/movePlayerFn';
import game from '../../entities/Game/Game';
import computerMove from '../../computerRival/computerRival';
import initHistoryWindow from '../histiryWindow/historyWindow';
import Player from '../../entities/Player/Player';
import Street from '../../entities/Street/Street';
import Communal from '../../entities/Communal/Communal';
import Property from '../../entities/ifacies/Property';
import playerLose from '../../losing/lose';
import { isGameFinish, end } from '../../gameEnding/gameEnding';

export default function showDialogWindow(action?: string): void {
  const language: string = localStorage.getItem('language');
  let title: HTMLElement;
  const cell = getCellObjByPosition(game.activePlayer.position);
  const dialogWindowSection = document.querySelector('.dialog-window');
  removeChildsFromElement(dialogWindowSection);
  switch (action) {
    case 'wait':
      const loader = createElement('div', ['loader']);
      appendElementTo(dialogWindowSection, loader);
      break;
    case 'roll':
      checkIsHuman();
      let rollBtnInnerText: string;
      if (language === 'RU') {
        title = createElement('p', ['title'], 'Сделать ход');
        rollBtnInnerText = 'Кинуть кубики';
      } else if (language === 'BEL') {
        title = createElement('p', ['title'], 'Зрабіць ход');
        rollBtnInnerText = 'Кінуць кубікі';
      } else {
        title = createElement('p', ['title'], 'Make a move');
        rollBtnInnerText = 'Roll Dice';
      }
      const rollButton = createElement('div', ['button'], rollBtnInnerText);
      rollButton.addEventListener('click', () => {
        showDialogWindow('wait');
        const p: Promise<void> = new Promise((resolve) => {
          let test: any;
          setTimeout(() => {
            test = setInterval(roll, 200);
          }, 0);
          setTimeout(() => {
            clearInterval(test);
            resolve();
          }, 3000);
        });
        p.then(() => {
          const diceValue = roll();
          movePlayer(diceValue);
          if (language === 'RU') {
            initHistoryWindow(`выкинул(а) ${diceValue} на кубиках`);
          } else if (language === 'BEL') {
            initHistoryWindow(`выкінуў(ла) ${diceValue} на кубіках`);
          } else {
            initHistoryWindow(`rolled ${diceValue} on the dice`);
          }
        });
      });
      appendElementTo(dialogWindowSection, title, rollButton);
      break;
    case 'buy':
      const buttonsWrapper = createElement('div', ['buttons-wrapper']);
      let buttonYes: HTMLElement;
      let buttonNo: HTMLElement;
      if (language === 'RU') {
        title = createElement('p', ['title'], `Kупить за $${cell.cost}?`);
        buttonYes = createElement('div', ['button', 'yes', 'pay-or-buy', 'buy'], 'Да');
        buttonNo = createElement('div', ['button', 'no'], 'Нет');
      } else if (language === 'BEL') {
        title = createElement('p', ['title'], `Купіць за $${cell.cost}?`);
        buttonYes = createElement('div', ['button', 'yes', 'pay-or-buy', 'buy'], 'Да');
        buttonNo = createElement('div', ['button', 'no'], 'Нет');
      } else {
        title = createElement('p', ['title'], `Buy for $${cell.cost}?`);
        buttonYes = createElement('div', ['button', 'yes', 'pay-or-buy', 'buy'], 'Yes');
        buttonNo = createElement('div', ['button', 'no'], 'No');
      }
      buttonNo.addEventListener('click', () => {
        showDialogWindow();
      });
      appendElementTo(buttonsWrapper, buttonYes, buttonNo);
      buttonYes.addEventListener('click', () => {
        addPropertyToPlayer(game.activePlayer, cell);
        changeMoneyOnPlayerCard(game.activePlayer);
        const ownerLine: HTMLElement = cell.element.querySelector('.owner');
        ownerLine.style.backgroundColor = game.activePlayer.color;
        if (cell.type === 'street') {
          setStreetRent(cell, game.activePlayer);
        } else if (cell.type === 'railroad') {
          setRailroadRent(game.activePlayer);
        } else {
          setCommunalRent(cell, game.activePlayer);
        }
        if (language === 'RU') {
          initHistoryWindow(`купил(ла) ${cell.russianName} за $${cell.cost}`);
        } else if (language === 'BEL') {
          initHistoryWindow(`купіў(ла) ${cell.belarusianName} за $${cell.cost}`);
        } else {
          initHistoryWindow(`bought ${cell.name} for $${cell.cost}`);
        }
        showDialogWindow();
      });
      if (!isPlayerHaveEnoughMoney(game.activePlayer, cell.cost)) {
        buttonYes.classList.add('inactive');
      }
      appendElementTo(dialogWindowSection, title, buttonsWrapper);
      break;
    case 'rent':
      if (cell.type !== 'communal') {
        let payRentButton: HTMLElement;
        if (language === 'RU') {
          title = createElement('p', ['title'], `Аренда $${cell.currentRent}`);
          payRentButton = createElement('div', ['button', 'pay-or-buy'], 'Заплатить');
        } else if (language === 'BEL') {
          title = createElement('p', ['title'], `Арэнда $${cell.currentRent}`);
          payRentButton = createElement('div', ['button', 'pay-or-buy'], 'Заплаціць');
        } else {
          title = createElement('p', ['title'], `The rent is $${cell.currentRent}`);
          payRentButton = createElement('div', ['button', 'pay-or-buy'], 'Pay');
        }
        if (isPlayerHaveEnoughMoney(game.activePlayer, cell.currentRent)) {
          payRentButton.addEventListener('click', () => {
            game.activePlayer.money -= cell.currentRent;
            changeMoneyOnPlayerCard(game.activePlayer);
            cell.owner.addMoney(cell.currentRent);
            changeMoneyOnPlayerCard(cell.owner);
            if (language === 'RU') {
              initHistoryWindow(`заплатил(а) $${cell.currentRent} аренды ${cell.owner.name}`);
            } else if (language === 'BEL') {
              initHistoryWindow(`заплаціў(ла) $${cell.currentRent} арэнды ${cell.owner.name}`);
            } else {
              initHistoryWindow(`paid $${cell.currentRent} rent to ${cell.owner.name}`);
            }
            showDialogWindow();
          });
          appendElementTo(dialogWindowSection, title, payRentButton);
        } else {
          removePlayerFromGame();
          if (isGameFinish()) {
            end();
          } else {
            nextPlayerMove();
          }
        }
      } else {
        let rollDiceButton: HTMLElement;
        if (language === 'RU') {
          title = createElement('p', ['title'], 'Киньте кубики');
          rollDiceButton = createElement('div', ['button'], 'Кинуть');
        } else if (language === 'BEL') {
          title = createElement('p', ['title'], 'Кіньце кубікі');
          rollDiceButton = createElement('div', ['button'], 'Кінуць');
        } else {
          title = createElement('p', ['title'], 'Roll dice to know rent');
          rollDiceButton = createElement('div', ['button'], 'Roll Dice');
        }
        rollDiceButton.addEventListener('click', () => {
          showDialogWindow('wait');
          const p: Promise<void> = new Promise((resolve) => {
            let test: any;
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
            let payRentButton: HTMLElement;
            if (language === 'RU') {
              title = createElement('p', ['title'], `Аренда $${rent}`);
              payRentButton = createElement('div', ['button', 'pay-or-buy'], 'Заплатить');
            } else if (language === 'BEL') {
              title = createElement('p', ['title'], `Арэнда $${rent}`);
              payRentButton = createElement('div', ['button', 'pay-or-buy'], 'Заплаціць');
            } else {
              title = createElement('p', ['title'], `The rent is $${rent}`);
              payRentButton = createElement('div', ['button', 'pay-or-buy'], 'Pay');
            }
            if (isPlayerHaveEnoughMoney(game.activePlayer, rent)) {
              payRentButton.addEventListener('click', () => {
                game.activePlayer.money -= rent;
                changeMoneyOnPlayerCard(game.activePlayer);
                cell.owner.addMoney(rent);
                changeMoneyOnPlayerCard(cell.owner);
                if (language === 'RU') {
                  initHistoryWindow(`заплатил(а) $${rent} аренды ${cell.owner.name}`);
                } else if (language === 'BEL') {
                  initHistoryWindow(`заплаціў(ла) $${rent} арэнды ${cell.owner.name}`);
                } else {
                  initHistoryWindow(`paid $${rent} rent to ${cell.owner.name}`);
                }
                showDialogWindow();
              });
              appendElementTo(dialogWindowSection, title, payRentButton);
            } else {
              removePlayerFromGame();
              if (isGameFinish()) {
                end();
              } else {
                nextPlayerMove();
              }
            }
          });
        });
        appendElementTo(dialogWindowSection, title, rollDiceButton);
      }
      break;
    case 'tax':
      if (isPlayerHaveEnoughMoney(game.activePlayer, cell.cost)) {
        let payTaxButton: HTMLElement;
        if (language === 'RU') {
          title = createElement('p', ['title'], `${cell.russianName} $${cell.cost}`);
          payTaxButton = createElement('div', ['button', 'pay-or-buy'], 'Заплатить');
        } else if (language === 'BEL') {
          title = createElement('p', ['title'], `${cell.belarusianName} $${cell.cost}`);
          payTaxButton = createElement('div', ['button', 'pay-or-buy'], 'Заплаціць');
        } else {
          title = createElement('p', ['title'], `${cell.name} $${cell.cost}`);
          payTaxButton = createElement('div', ['button', 'pay-or-buy'], 'Pay');
        }
        payTaxButton.addEventListener('click', () => {
          game.activePlayer.subtractMoney(cell.cost);
          changeMoneyOnPlayerCard(game.activePlayer);
          if (language === 'RU') {
            initHistoryWindow(`заплатил(а) $${cell.cost} ${cell.russianName}`);
          } else if (language === 'BEL') {
            initHistoryWindow(`заплаціў(ла) $${cell.cost} ${cell.belarusianName}`);
          } else {
            initHistoryWindow(`paid $${cell.cost} ${cell.name}`);
          }
          showDialogWindow();
        });
        appendElementTo(dialogWindowSection, title, payTaxButton);
      } else {
        removePlayerFromGame();
        if (isGameFinish()) {
          end();
        } else {
          nextPlayerMove();
        }
      }
      break;
    default:
      let endButton: HTMLElement;
      if (language === 'RU') {
        title = createElement('p', ['title'], 'Закончить ход?');
        endButton = createElement('div', ['button'], 'Да');
      } else if (language === 'BEL') {
        title = createElement('p', ['title'], 'Скончыць ход?');
        endButton = createElement('div', ['button'], 'Да');
      } else {
        title = createElement('p', ['title'], 'End the turn?');
        endButton = createElement('div', ['button'], 'Yes');
      }
      endButton.addEventListener('click', () => {
        setNextPlayerAsActive();
        nextPlayerMove();
      });
      appendElementTo(dialogWindowSection, title, endButton);
  }
}

export function removePlayerFromGame(): void {
  const loser = game.activePlayer;
  const language = localStorage.getItem('language');
  if (language === 'RU') {
    initHistoryWindow('обанкротился(лась)');
  } else if (language === 'BEL') {
    initHistoryWindow('абанкроціўся(лась)');
  } else {
    initHistoryWindow('went bankrupt');
  }
  setNextPlayerAsActive();
  playerLose(loser);
}

function nextPlayerMove(): void {
  if (game.activePlayer.isHuman) {
    showDialogWindow('roll');
  } else {
    showDialogWindow('wait');
    computerMove('roll');
  }
}

export function addPropertyToPlayer(player: Player, property: Property): void {
  player.addProperty(property);
  player.subtractMoney(property.cost);
  property.owner = game.activePlayer;
}

export function getCellObjByPosition(position: number): any {
  for (let i = 0; i < game.cells.length; i += 1) {
    const cell = game.cells[i];
    if (cell.position === position) {
      return cell;
    }
  }
}

export function isPlayerHaveEnoughMoney(player: Player, price: number): boolean {
  return player.money >= price;
}

export function setStreetRent(property: Street, player: Player): void {
  let rent: HTMLElement = property.element.querySelector('.cost');
  if (property.isThereHotel) {
    rent.innerText = `$${property.rentWhithHotel}`;
    property.currentRent = property.rentWhithHotel;
  } else {
    switch (property.numberOfHouses) {
      case 1:
        rent.innerText = `$${property.rentWithOneHouse}`;
        property.currentRent = property.rentWithOneHouse;
        break;
      case 2:
        rent.innerText = `$${property.rentWhithTwoHouses}`;
        property.currentRent = property.rentWhithTwoHouses;
        break;
      case 3:
        rent.innerText = `$${property.rentWithTreeHouses}`;
        property.currentRent = property.rentWithTreeHouses;
        break;
      case 4:
        rent.innerText = `$${property.rentWhithFourHouses}`;
        property.currentRent = property.rentWhithFourHouses;
        break;
      default:
        if (isColorSet(player, property)) {
          for (let i = 0; i < player.property.length; i += 1) {
            const playerProperty = player.property[i];
            if (playerProperty.kitId === property.kitId) {
              rent = playerProperty.element.querySelector('.cost');
              rent.innerText = `$${playerProperty.rent * 2}`;
              playerProperty.currentRent = playerProperty.rent * 2;
            }
          }
        } else {
          const rent: HTMLElement = property.element.querySelector('.cost');
          rent.innerText = `$${property.rent}`;
          property.currentRent = property.rent;
        }
        break;
    }
  }
}

export function setCommunalRent(property: Communal, player: Player): void {
  if (isColorSet(player, property)) {
    for (let i = 0; i < player.property.length; i += 1) {
      const playerProperty = player.property[i];
      if (playerProperty.kitId === property.kitId) {
        const rent: HTMLElement = playerProperty.element.querySelector('.cost');
        rent.innerText = 'x10';
      }
    }
  } else {
    const rent: HTMLElement = property.element.querySelector('.cost');
    rent.innerText = 'x4';
  }
}

export function setRailroadRent(player: Player): void {
  let railroadCounter = 0;
  player.property.forEach((propery) => {
    if (propery.type === 'railroad') {
      railroadCounter += 1;
    }
  });
  player.property.forEach((propery) => {
    if (propery.type === 'railroad') {
      propery.currentRent = railroadCounter;
      const rent: HTMLElement = propery.element.querySelector('.cost');
      rent.innerText = `$${propery.currentRent}`;
    }
  });
}

function setAvailableToBuyHouse(player: Player, purchaseProperty: Property): void {
  if (purchaseProperty.type === 'street') {
    const allPlayerProperties = player.property;
    allPlayerProperties.filter((property) => property.kitId === purchaseProperty.kitId)
      .map((property) => {
        property.isAvailableToBuyHouse = true;
      });
  }
}

export function isColorSet(player: Player, purchaseProperty: Property): boolean {
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

export function setNextPlayerAsActive(): void {
  game.activePlayer.playerCard.classList.remove('backlight');
  const activePlayerIndex = game.players.indexOf(game.activePlayer);
  if (activePlayerIndex < game.players.length - 1) {
    game.activePlayer = game.players[activePlayerIndex + 1];
  } else {
    game.activePlayer = game.players[0];
  }
  game.activePlayer.playerCard.classList.add('backlight');
}

export function changeMoneyOnPlayerCard(player: Player): void {
  const playerCardMoney: HTMLElement = player.playerCard.querySelector('.player-card__cash__money');
  playerCardMoney.innerText = `${player.money}`;
}
