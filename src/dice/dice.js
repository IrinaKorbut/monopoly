function roll() {
  const facesNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
  const allFaces = document.querySelectorAll('.face');
  allFaces.forEach((face) => {
    face.style.display = 'none';
  });
  const firstDiceFace = Math.floor(Math.random() * 6);
  const secondDiceFace = Math.floor(Math.random() * 6);
  document.querySelector(`.dice-one .${facesNames[firstDiceFace]}-face`).style.display = 'flex';
  document.querySelector(`.dice-two .${facesNames[secondDiceFace]}-face`).style.display = 'flex';
  return firstDiceFace + secondDiceFace;
}

export function diceInitTest() {
  const rollButton = document.querySelector('.roll-button');
  const rollButtonEvent = function (){
    //rollButton.style.pointerEvents = 'none';
    rollButton.removeEventListener('click', rollButtonEvent);
    const test = setInterval(roll, 200);
    setTimeout(() => {
      clearInterval(test);
      rollButton.addEventListener('click', rollButtonEvent);
      //rollButton.style.pointerEvents = 'auto';
    }, 3000);
  }
  rollButton.addEventListener('click', rollButtonEvent);
}
