import cells from '../cells/cells';

function checkWherePlayerNow(player) {
  const currentPlayerCell = player.parentNode;
  currentPlayerCell.removeChild(player);
  let currentPlayerPosition;
  cells.forEach((item) => {    
    if (item.element === currentPlayerCell) {
      currentPlayerPosition = item.position;
    };
  });
  return currentPlayerPosition;
}

function showAnimationMove(currentPlayerPosition, playerPositionAfterMove, player) {
  for (let i = currentPlayerPosition + 1, j = 1; i <= playerPositionAfterMove; i += 1) {
    if (i === 40) {
      playerPositionAfterMove = playerPositionAfterMove - 40;
      i = 0;
    }

    if (i < playerPositionAfterMove) {
      setTimeout(() => { cells[i].element.classList.toggle('active'); }, j * 400);
      setTimeout(() => { cells[i].element.classList.toggle('active'); }, j * 400 + 200);
      j += 1;
    };
    if (i === playerPositionAfterMove) {
      setTimeout(() => { cells[playerPositionAfterMove].element.appendChild(player); }, j * 400);
    };
  };
};

export default function movePlayer(stepsAmount) {
  const player = document.querySelector('.player');
  const currentPlayerPosition = checkWherePlayerNow(player);
  const playerPositionAfterMove = currentPlayerPosition + stepsAmount;
  showAnimationMove(currentPlayerPosition, playerPositionAfterMove, player);
}
