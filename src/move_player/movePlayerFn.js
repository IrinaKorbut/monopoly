import cells from '../cells/cells';
//import { game, player } from '../main';
import game from '../Game/Game';
import showDialogWindow from '../dialogWindow/dialogWindow';

function checkWherePlayerNow(playerDisplay) {
  const currentPlayerCell = playerDisplay.parentNode;
  currentPlayerCell.removeChild(playerDisplay);
  let currentPlayerPosition;
  cells.forEach((item) => {
    if (item.element === currentPlayerCell) {
      currentPlayerPosition = item.position;
    }
  });
  return currentPlayerPosition;
}

function highlightActiveCell(delay, i) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cells[i].element.classList.toggle('active');
      resolve();
    }, delay);
  });
}

function resetPlayerPosition(playerPositionAfterMove) {
  return playerPositionAfterMove - 40;
}

function addMoneyPerCycle() {
  game.activePlayer.money += 200;
}

async function showAnimationMove(currentPlayerPosition, playerPositionAfterMove, playerDisplay) {
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
      cells[playerPositionAfterMove].element.appendChild(playerDisplay);
    }
  }
}

function doMoveLogic(playerPositionAfterMove) {
  game.activePlayer.position = playerPositionAfterMove;
  const cellType = cells[playerPositionAfterMove].type;
  switch (cellType) {
    case 'start':
    case 'jail':
    case 'parking':
    case 'goToJail':
      showDialogWindow();
      break;
    case 'chest':
      showDialogWindow();
      break;
    case 'chance':
      showDialogWindow();
      break;
    case 'tax':
      showDialogWindow('tax');
      break;
    default:
      const cellsOwner = cells[playerPositionAfterMove].owner;
      if (cellsOwner && cellsOwner !== game.activePlayer) {
        showDialogWindow('rent');
      } 
      if (!cellsOwner) {
        showDialogWindow('buy');
      }
      if (cellsOwner === game.activePlayer) {
        showDialogWindow();
      }
      break;
  }
}

export default async function movePlayer(stepsAmount) {
  const playerDisplay = document.querySelector('.player');
  const currentPlayerPosition = checkWherePlayerNow(playerDisplay);
  let playerPositionAfterMove = currentPlayerPosition + stepsAmount;
  await showAnimationMove(currentPlayerPosition, playerPositionAfterMove, playerDisplay);
  if (playerPositionAfterMove > 39) {
    playerPositionAfterMove = resetPlayerPosition(playerPositionAfterMove);
    addMoneyPerCycle();
  }
  doMoveLogic(playerPositionAfterMove);
  console.log(game)
}
