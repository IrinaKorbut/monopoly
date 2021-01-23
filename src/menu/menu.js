export function btnClikMenu() {
    const btnMenu = document.querySelector('.btn-Menu')
    const audioPlay = new Audio('./audio/Ennio-Morricone.mp3')
    btnMenu.addEventListener('click', () => classMenu(audioPlay))
}

function classMenu(audioPlay) {
    document.querySelector('.setings-menu').classList.toggle('window-menu')
    document.querySelector('#blackout').classList.toggle('blackout');
    document.querySelector('.setings-menu').classList.toggle('no-burger-menu')
}