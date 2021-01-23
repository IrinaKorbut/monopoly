import { createElement, appendElementTo } from '../helpFunctions/helpFunctions'

function menu(audioPlay) {
    const setingMenu = document.querySelector('.setings-menu')
    setingMenu.innerHTML = '';

    const heder = createElement('div', ['heder'])
    const btnClose = createElement('div', ['btn-close'], 'x')
    const menu = createElement('div', ['name-menu'], 'Menu')

    const nameBtn = createElement('div', ['name-btn'])

    const setings = createElement('div', ['name-setings'], 'Setings')
    const language = createElement('div', ['language'], 'Language')
    const newPlay = createElement('div', ['new-play'], 'New Play')
    const options = createElement('div', ['options'])

    appendElementTo(setingMenu, heder, nameBtn)
    appendElementTo(heder, menu, btnClose)
    appendElementTo(nameBtn, setings, language, newPlay, options)

    newPlay.addEventListener('click', () => console.log('добавить Функции перезагрузки игры'))
    btnClose.addEventListener('click', () => classMenu(audioPlay))
}

export function btnClikMenu() {
    const btnMenu = document.querySelector('.btn-Menu')
    const audioPlay = new Audio('./audio/Ennio-Morricone.mp3')
    btnMenu.addEventListener('click', () => classMenu(audioPlay))
}

function classMenu(audioPlay) {
    document.querySelector('.setings-menu').classList.toggle('window-menu')
    document.querySelector('#blackout').classList.toggle('blackout');
    document.querySelector('.setings-menu').classList.toggle('no-burger-menu')

    menu(audioPlay)
}