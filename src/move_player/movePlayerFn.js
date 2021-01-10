const cells = [];

function createArrOfCells() {
  for (let i = 0; i < 40; i += 1) {
    cells.push(document.getElementById(`${i}`));
  }
}

function checkWherePlayerNow(player) {
  const currentPlayerCell = player.parentNode;
  currentPlayerCell.removeChild(player);
  const currentPlayerPosition = cells.indexOf(currentPlayerCell);
  return currentPlayerPosition;
}

function showAnimationMove(currentPlayerPosition, playerPositionAfterMove, player) {
  for (let i = currentPlayerPosition + 1, j = 1; i <= playerPositionAfterMove; i += 1) {
    if (i < playerPositionAfterMove) {
      setTimeout(() => { cells[i].classList.toggle('active'); }, j * 400);
      setTimeout(() => { cells[i].classList.toggle('active'); }, j * 400 + 200);
      j += 1;
    }
    if (i === playerPositionAfterMove) {
      setTimeout(() => { cells[playerPositionAfterMove].appendChild(player); }, j * 400);
    }
  }
}

export default function movePlayer(stepsAmount) {
  createArrOfCells();
  const player = document.querySelector('.player');
  const currentPlayerPosition = checkWherePlayerNow(player);
  const playerPositionAfterMove = currentPlayerPosition + stepsAmount;
  showAnimationMove(currentPlayerPosition, playerPositionAfterMove, player);
//   setTimeout(() => { cells[playerPositionAfterMove].appendChild(player); }, 6000);
}
