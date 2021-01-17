export default function roll() {
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
