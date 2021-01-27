import cells from '../cells/cells';
import computerMove from '../computerRival/computerRival';
import game from '../Game/Game';
import showDialogWindow from '../dialogWindow/dialogWindow';
import { changeMoneyOnPlayerCard } from '../dialogWindow/dialogWindow';
import initHistoryWindow from '../histiryWindow/historyWindow';
import Cell from '../Cell/Cell';
import Player from '../Player/Player';


function checkWherePlayerNow(playerDisplay: HTMLElement): number {
  const currentPlayerCell = <HTMLElement>playerDisplay.parentNode.parentNode;
  playerDisplay.remove();
  let currentPlayerPosition: number;
  cells.forEach((item: Cell) => {
    if (item.element === currentPlayerCell) {
      currentPlayerPosition = item.position;
    }
  });
  return currentPlayerPosition;
}

function highlightActiveCell(delay: number, i: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (i === 10) {
        cells[i].element.children[1].classList.toggle('active');
      }
      cells[i].element.classList.toggle('active');
      resolve();
    }, delay);
  });
}

function resetPlayerPosition(playerPositionAfterMove: number): number{
  return playerPositionAfterMove - 40;
}

function addMoneyPerCycle(): void {
  game.activePlayer.money += 200;
  changeMoneyOnPlayerCard(game.activePlayer);
  initHistoryWindow('got $ 200 for completing the circle');
}

async function showAnimationMove(currentPlayerPosition: number, playerPositionAfterMove: number, playerDisplay: HTMLElement) {
  for (let i = currentPlayerPosition + 1; i <= playerPositionAfterMove; i += 1) {
    if (i === 40) {
      playerPositionAfterMove = resetPlayerPosition(playerPositionAfterMove);
      i = 0;
    }
    if (i < playerPositionAfterMove) {
      await highlightActiveCell(250, i);
      await highlightActiveCell(250, i);
    }
    if (i === playerPositionAfterMove) {
      setTimeout(() => {
        cells[playerPositionAfterMove].element.querySelector('.players-container').appendChild(playerDisplay);
      }, 200);      
    }
  }
}

function doMoveLogic(playerPositionAfterMove: number): void {
  game.activePlayer.position = playerPositionAfterMove;
  const cellType: string = cells[playerPositionAfterMove].type;
  switch (cellType) {
    case 'start':
    case 'jail':
    case 'parking':
    case 'goToJail':
      if (game.activePlayer.isHuman) {
        showDialogWindow();
      } else {
        computerMove();
      }
      break;
    case 'chest':
      if (game.activePlayer.isHuman) {
        showDialogWindow();
      } else {
        computerMove();
      }
      break;
    case 'chance':
      if (game.activePlayer.isHuman) {
        showDialogWindow();
      } else {
        computerMove();
      }
      break;
    case 'tax':
      if (game.activePlayer.isHuman) {
        showDialogWindow('tax');
      } else {
        computerMove('tax');
      }
      break;
    default:
      const cellsOwner: Player = (<any>cells[playerPositionAfterMove]).owner;
      if (cellsOwner && cellsOwner !== game.activePlayer) {
        if (game.activePlayer.isHuman) {
          showDialogWindow('rent');
        } else {
          computerMove('rent');
        }
        return;
      }
      if (!cellsOwner) {
        if (game.activePlayer.isHuman) {
          showDialogWindow('buy');
        } else {
          computerMove('buy');
        }
        return;
      }
      if (cellsOwner === game.activePlayer) {
        if (game.activePlayer.isHuman) {
          showDialogWindow();
        } else {
          computerMove();
        }
      }
      break;
  }
}

export default async function movePlayer(stepsAmount: number) {
  const playerDisplay: HTMLElement = game.activePlayer.chip;
  const currentPlayerPosition: number = checkWherePlayerNow(playerDisplay);
  let playerPositionAfterMove: number = currentPlayerPosition + stepsAmount;
  await showAnimationMove(currentPlayerPosition, playerPositionAfterMove, playerDisplay);
  if (playerPositionAfterMove > 39) {
    playerPositionAfterMove = resetPlayerPosition(playerPositionAfterMove);
    addMoneyPerCycle();
  }
  doMoveLogic(playerPositionAfterMove);
}
