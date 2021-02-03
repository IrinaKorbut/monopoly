import roll from '../gameSections/dice/dice';
import game from '../entities/Game/Game';
import movePlayer from '../move_player/movePlayerFn';
import showDialogWindow, {
  getCellObjByPosition, isPlayerHaveEnoughMoney, addPropertyToPlayer, changeMoneyOnPlayerCard,
  setNextPlayerAsActive, setStreetRent, setRailroadRent, setCommunalRent, isColorSet,
  removePlayerFromGame,
} from '../gameSections/dialogWindow/dialogWindow';
import initHistoryWindow from '../gameSections/histiryWindow/historyWindow';
import { isGameFinish, end } from '../gameEnding/gameEnding';
import { checkIsHuman } from '../helpFunctions/helpFunctions';

export default function computerMove(action?: string): void {
  const language = localStorage.getItem('language');
  const cell = getCellObjByPosition(game.activePlayer.position);
  switch (action) {
    case 'roll':
      checkIsHuman();
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
      break;
    case 'buy':
      if (isPlayerHaveEnoughMoney(game.activePlayer, cell.cost)) {
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
        if (language === 'RU') {
          initHistoryWindow(`купил(ла) ${cell.russianName} за $${cell.cost}`);
        } else if (language === 'BEL') {
          initHistoryWindow(`купіў(ла) ${cell.belarusianName} за $${cell.cost}`);
        } else {
          initHistoryWindow(`bought ${cell.name} for $${cell.cost}`);
        }
        computerMove();
      } else {
        computerMove();
      }
      break;
    case 'rent':
      if (cell.type !== 'communal') {
        if (isPlayerHaveEnoughMoney(game.activePlayer, cell.currentRent)) {
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
          computerMove();
        } else {
          removePlayerFromGame();
          if (isGameFinish()) {
            end();
          } else {
            nextPlayerMove();
          }
        }
      } else {
        const promise: Promise<void> = new Promise((resolve) => {
          let test: any;
          setTimeout(() => {
            test = setInterval(roll, 200);
          }, 0);
          setTimeout(() => {
            clearInterval(test);
            resolve();
          }, 3000);
        });
        promise.then(() => {
          let rent = roll();
          rent = isColorSet(cell.owner, cell) ? rent * 10 : rent * 4;
          if (isPlayerHaveEnoughMoney(game.activePlayer, rent)) {
            game.activePlayer.money -= rent;
            changeMoneyOnPlayerCard(game.activePlayer);
            cell.owner.addMoney(rent);
            changeMoneyOnPlayerCard(cell.owner);
            if (language === 'RU') {
              initHistoryWindow(`заплатил(а) $${cell.currentRent} аренды ${cell.owner.name}`);
            } else if (language === 'BEL') {
              initHistoryWindow(`заплаціў(ла) $${cell.currentRent} арэнды ${cell.owner.name}`);
            } else {
              initHistoryWindow(`paid $${cell.currentRent} rent to ${cell.owner.name}`);
            }
            computerMove();
          } else {
            removePlayerFromGame();
            if (isGameFinish()) {
              end();
            } else {
              nextPlayerMove();
            }
          }
        });
      }
      break;
    case 'tax':
      if (isPlayerHaveEnoughMoney(game.activePlayer, cell.cost)) {
        game.activePlayer.subtractMoney(cell.cost);
        changeMoneyOnPlayerCard(game.activePlayer);
        if (language === 'RU') {
          initHistoryWindow(`заплатил(а) $${cell.cost} ${cell.russianName}`);
        } else if (language === 'BEL') {
          initHistoryWindow(`заплаціў(ла) $${cell.cost} ${cell.belarusianName}`);
        } else {
          initHistoryWindow(`paid $${cell.cost} ${cell.name}`);
        }
        computerMove();
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
      setNextPlayerAsActive();
      nextPlayerMove();
      break;
  }
}

function nextPlayerMove(): void {
  if (game.activePlayer.isHuman) {
    showDialogWindow('roll');
  } else {
    computerMove('roll');
  }
}
