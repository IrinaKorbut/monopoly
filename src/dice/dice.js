function roll(num) {
  if (num === 1) {
    document.querySelector('.first-face').style.display = 'flex';
    document.querySelector('.second-face').style.display = 'none';
    document.querySelector('.third-face').style.display = 'none';
    document.querySelector('.fourth-face').style.display = 'none';
    document.querySelector('.fifth-face').style.display = 'none';
    document.querySelector('.sixth-face').style.display = 'none';
  }
  if (num === 2) {
    document.querySelector('.first-face').style.display = 'none';
    document.querySelector('.second-face').style.display = 'flex';
    document.querySelector('.third-face').style.display = 'none';
    document.querySelector('.fourth-face').style.display = 'none';
    document.querySelector('.fifth-face').style.display = 'none';
    document.querySelector('.sixth-face').style.display = 'none';
  }
  if (num === 3) {
    document.querySelector('.first-face').style.display = 'none';
    document.querySelector('.second-face').style.display = 'none';
    document.querySelector('.third-face').style.display = 'flex';
    document.querySelector('.fourth-face').style.display = 'none';
    document.querySelector('.fifth-face').style.display = 'none';
    document.querySelector('.sixth-face').style.display = 'none';
  }
  if (num === 4) {
    document.querySelector('.first-face').style.display = 'none';
    document.querySelector('.second-face').style.display = 'none';
    document.querySelector('.third-face').style.display = 'none';
    document.querySelector('.fourth-face').style.display = 'flex';
    document.querySelector('.fifth-face').style.display = 'none';
    document.querySelector('.sixth-face').style.display = 'none';
  }
  if (num === 5) {
    document.querySelector('.first-face').style.display = 'none';
    document.querySelector('.second-face').style.display = 'none';
    document.querySelector('.third-face').style.display = 'none';
    document.querySelector('.fourth-face').style.display = 'none';
    document.querySelector('.fifth-face').style.display = 'flex';
    document.querySelector('.sixth-face').style.display = 'none';
  }
  if (num === 6) {
    document.querySelector('.first-face').style.display = 'none';
    document.querySelector('.second-face').style.display = 'none';
    document.querySelector('.third-face').style.display = 'none';
    document.querySelector('.fourth-face').style.display = 'none';
    document.querySelector('.fifth-face').style.display = 'none';
    document.querySelector('.sixth-face').style.display = 'flex';
  }
}

export function diceInitTest() {
  document.querySelector('.roll-button').addEventListener('click', () => {
    const num = Math.floor(Math.random() * 6) + 1;
    roll(num);
  });
}
