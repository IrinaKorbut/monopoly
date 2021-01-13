import movePlayer from '../move_player/movePlayerFn';

export function roll() {
  const facesNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
  const allFaces = document.querySelectorAll('.face');
  allFaces.forEach((face) => {
    face.style.display = 'none';
  });
  const firstDiceFace = Math.floor(Math.random() * 6) + 1;
  const secondDiceFace = Math.floor(Math.random() * 6) + 1;
  document.querySelector(`.dice-one .${facesNames[firstDiceFace - 1]}-face`).style.display = 'flex';
  document.querySelector(`.dice-two .${facesNames[secondDiceFace - 1]}-face`).style.display = 'flex';
  return firstDiceFace + secondDiceFace;
}

export default function diceInit() {
  const rollButton = document.querySelector('.roll-button');
  const rollButtonEvent = function () {
    rollButton.removeEventListener('click', rollButtonEvent);    
    const p = new Promise((resolve) => {
      let test;
      setTimeout(() => {
        test = setInterval(roll, 200);
        rollButton.addEventListener('click', rollButtonEvent);
      }, 0);
      setTimeout(() => {
        clearInterval(test);
        resolve();
      }, 3000);
    });
    p.then(() => {
      movePlayer(roll());
    });
  };
  rollButton.addEventListener('click', rollButtonEvent);
}
