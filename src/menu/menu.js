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

    setings.addEventListener('click', () => setingsMeny(nameBtn, menu, audioPlay))
    newPlay.addEventListener('click', () => console.log('добавить Функции перезагрузки игры'))
    btnClose.addEventListener('click', () => classMenu(audioPlay))
}

function setingsMeny(classOptions, menus, audioPlay) {

    classOptions.innerHTML = '';
    const audio = createElement('div', ['audio'], 'Audio')

    const audioBtn = createElement('div', ['slideThree'])
    const audioInput = createElement('input', ['slideThreeInput'])

    let stateRange = localStorage.getItem('stateRange')
    audioInput.checked = Boolean(+stateRange)

    audioInput.id = 'slideThree'
    audioInput.type = "checkbox"
    audioInput.name = "check"

    const audioLabel = createElement('label', ['audioLabel'])
    audioLabel.setAttribute('for', "slideThree");


    const volume = createElement('div', ['volume'], 'Volume')
    const volumeLabel = createElement('label', ['volumeLabel'])

    const volumeInput = createElement('input', ['volumeInput'])
    volumeInput.setAttribute('type', "range");
    volumeInput.setAttribute('min', "0");
    volumeInput.setAttribute('max', "1");
    volumeInput.setAttribute('step', "0.1");

    let volumeValue = localStorage.getItem('volume')
    volumeInput.value = volumeValue || 0.5

    appendElementTo(classOptions, audio, volume)
    appendElementTo(audio, audioBtn)
    appendElementTo(audioBtn, audioInput, audioLabel)
    appendElementTo(volume, volumeLabel, volumeInput)

    audioFn(audioPlay)

    menus.addEventListener('click', menu)
}

function polz(audio, volumeInputElem) {
    localStorage.setItem('volume', volumeInputElem.value);
    audio.volume = volumeInputElem.value
}

function audioFn(audioPlay) {
    const audioBtn = document.querySelector('.slideThreeInput')
    let volumeInput = document.querySelector('.volumeInput');

    volumeInput.addEventListener('click', (e) => polz(audioPlay, e.target))
    audioBtn.addEventListener('click', (e) => audioRepeat(audioPlay, e.target))
}

function audioRepeat(audio, audioBtnElem) {

    localStorage.setItem('stateRange', Number(audioBtnElem.checked));
    audioBtnElem.checked ? audio.play() : audio.pause()

    audio.addEventListener('ended', () => audio.play())
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