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
  document.querySelector('.roll-button').addEventListener('click', () => {
    const test = setInterval(roll, 200);
    setTimeout(() => clearInterval(test), 3000);
  });
}
