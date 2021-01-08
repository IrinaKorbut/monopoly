const cells = [
  document.getElementById('0'),
  document.getElementById('1'),
  document.getElementById('2'),
  document.getElementById('3'),
  document.getElementById('4'),
  document.getElementById('5'),
  document.getElementById('6'),
  document.getElementById('7'),
  document.getElementById('8'),
  document.getElementById('9'),
  document.getElementById('10'),
  document.getElementById('11'),
  document.getElementById('12'),
  document.getElementById('13'),
  document.getElementById('14'),
  document.getElementById('15'),
  document.getElementById('16'),
  document.getElementById('17'),
  document.getElementById('18'),
  document.getElementById('19'),
  document.getElementById('20'),
  document.getElementById('21'),
  document.getElementById('22'),
  document.getElementById('23'),
  document.getElementById('24'),
  document.getElementById('25'),
  document.getElementById('26'),
  document.getElementById('27'),
  document.getElementById('28'),
  document.getElementById('29'),
  document.getElementById('30'),
  document.getElementById('31'),
  document.getElementById('32'),
  document.getElementById('33'),
  document.getElementById('34'),
  document.getElementById('35'),
  document.getElementById('36'),
  document.getElementById('37'),
  document.getElementById('38'),
  document.getElementById('39'),
];

function checkWherePlayerNow(player) {
  const currentPlayerCell = player.parentNode;
  currentPlayerCell.removeChild(player);
  const currentPlayerPosition = cells.indexOf(currentPlayerCell);
  return currentPlayerPosition;
}

function showAnimationMove(currentPlayerPosition, playerPositionAfterMove, player) {
  for (let i = currentPlayerPosition + 1, j = 1; i <= playerPositionAfterMove; i += 1) {
    if (i < playerPositionAfterMove) {
      // cells[i].classList.toggle('active');
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
  const player = document.querySelector('.player');
  const currentPlayerPosition = checkWherePlayerNow(player);
  const playerPositionAfterMove = currentPlayerPosition + stepsAmount;
  showAnimationMove(currentPlayerPosition, playerPositionAfterMove, player);
//   setTimeout(() => { cells[playerPositionAfterMove].appendChild(player); }, 6000);
}
