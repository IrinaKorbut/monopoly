import cells from '../cells/cells';
import { game, player } from '../main';

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
  console.log(playerPositionAfterMove)
  game.activePlayer.position = playerPositionAfterMove;
  const cellType = cells[playerPositionAfterMove].type;
  switch (cellType) {
    case 'start':
    case 'jail':
    case 'parking':
    case 'goToJail':
      // showDialogWindow('roll')
      break;
    case 'chest':
      // showDialogWindow('chest')
      break;
    case 'chance':
      // showDialogWindow('chance')
      break;
    case 'tax':
      // showDialogWindow('tax')
      break;
    default:
      // showDialogWindow('buy')
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
  }
  doMoveLogic(playerPositionAfterMove);
}
