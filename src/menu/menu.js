import { createElement, appendElementTo } from '../helpFunctions/helpFunctions'
import { startWindow } from '../StartWindow/startWindow';
import Game from '../Game/Game';
import Player from '../Player/Player';

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

    setings.addEventListener('click', () => setingsMeny(setingMenu, nameBtn, menu, setings, audioPlay))
    newPlay.addEventListener('click', () => newPlayFn())
    btnClose.addEventListener('click', () => classMenu(audioPlay))
}

function newPlayFn() {

}

function setingsMeny(setingMenu, classOptions, menus, setings, audioPlay) {
    menus.textContent = setings.textContent
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

    const back = createElement('button', ['back'], 'back')

    let volumeValue = localStorage.getItem('volume')
    volumeInput.value = volumeValue || 0.5

    appendElementTo(setingMenu, back)
    appendElementTo(classOptions, audio, volume)

    appendElementTo(audio, audioBtn)
    appendElementTo(audioBtn, audioInput, audioLabel)
    appendElementTo(volume, volumeLabel, volumeInput)

    audioFn(audioPlay)

    back.addEventListener('click', menu)
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

export function keyEsc(audioPlay) {
    document.addEventListener('keydown', (event) => {
        const audioBtn = document.querySelector('.slideThreeInput')
        const volumeInputs = document.querySelector('.volumeInput');

        if (event.code === 'Escape') {
            classMenu(audioPlay)
        }

        if (event.code === 'F9') {
            localStorage.setItem('stateRange', Number(audioPlay.paused));
            audioPlay.paused ? audioPlay.play() : audioPlay.pause()
            audioPlay.addEventListener('ended', () => audioPlay.play())

            if (audioBtn) {
                audioBtn.checked ? audioBtn.checked = false : audioBtn.checked = true
                audioRepeat(audioPlay, audioBtn)
            }
        }

        if (event.code === 'NumpadAdd') {  //+  
            if (audioPlay.volume < 0.99) {
                audioPlay.volume += 0.1
                localStorage.setItem('volume', audioPlay.volume);
            }

            if (volumeInputs) {
                if (audioPlay.volume < 0.99) {
                    volumeInputs.value = audioPlay.volume += 0.1
                    localStorage.setItem('volume', volumeInputs.value);
                }
            }
        }

        if (event.code === 'NumpadSubtract') { //-
            if (audioPlay.volume > 0.1) {
                audioPlay.volume -= 0.1
                localStorage.setItem('volume', audioPlay.volume);
            }

            if (volumeInputs) {
                if (audioPlay.volume > 0.1) {
                    volumeInputs.value = audioPlay.volume -= 0.1
                    localStorage.setItem('volume', volumeInputs.value);
                }
            }

        }
    })
}

export function btnClikMenu() {
    const btnMenu = document.querySelector('.btn-Menu')
    const audioPlay = new Audio('./audio/Ennio-Morricone.mp3')
    btnMenu.addEventListener('click', () => classMenu(audioPlay))
    keyEsc(audioPlay)
    checkBtnAudio(audioPlay)
}

function classMenu(audioPlay) {
    document.querySelector('.setings-menu').classList.toggle('window-menu')
    document.querySelector('#blackout').classList.toggle('blackout');
    document.querySelector('.setings-menu').classList.toggle('no-burger-menu')

    menu(audioPlay)
}

function checkBtnAudio(audioPlay) {   
    const stateRange = localStorage.getItem('stateRange')
    stateRange === '1' ? audioPlay.play() : audioPlay.pause()
}