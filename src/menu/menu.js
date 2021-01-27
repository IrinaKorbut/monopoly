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
    newPlay.addEventListener('click', newPlayFn)
    btnClose.addEventListener('click', () => classMenu(audioPlay))
}

function newPlayFn() {
    Game.players.forEach(player => {
        player.chip.remove()
        player.playerCard.remove()
    })
    Game.players = []
    Game.cells.forEach(cell => {
        if (cell.type === 'street' || cell.type === 'railroad' || cell.type === 'communal') {
            cell.owner = null
            cell.isAvailableToBuyHouse = false;
            cell.numberOfHouses = 0;
            cell.isThereHotel = false;

            document.querySelectorAll('.house').forEach(hous => hous.remove())
            document.querySelector('.action-list').innerHTML = "";
            const propertyViewCost = cell.element.querySelector('.cost');
            const ownerColor = cell.element.querySelector('.owner');
            ownerColor.style.backgroundColor = '#c0c0c0';
            propertyViewCost.innerText = `$${cell.cost}`;
        }
    })

    document.querySelector('.setings-menu').classList.toggle('no-burger-menu')
    document.querySelector('.setings-menu').classList.toggle('window-menu')
    document.querySelector('.start-window').classList.toggle('no-active');

    startWindow()
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

    const back = createElement('div', ['back'], 'back')

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
    checkBtnAudio(audio)
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

            checkBtnAudio(audioPlay)

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
        }5
    })
}

export function btnClikMenu() {
    const btnMenu = document.querySelector('.btn-Menu')
    const audioPlay = new Audio('./audio/Ennio-Morricone.mp3')
    btnMenu.addEventListener('click', () => classMenu(audioPlay))
    keyEsc(audioPlay)
    checkBtnAudio(audioPlay)

    const blackout = document.querySelector('#blackout')
    blackout.addEventListener('click', clickBlackout)
}

function clickBlackout() {
    const startWindow = document.querySelector('.start-window')
    const setingsMenu = document.querySelector('.setings-menu')

    if (startWindow.classList[2] === 'menu-and-section' && setingsMenu.classList[1] === 'window-menu') {
        classMenu()
    }
    if (startWindow.classList[1] === 'no-active' && setingsMenu.classList[1] === 'window-menu') {
        classMenu()
    }
}

function classMenu(audioPlay) {
    const startWindow = document.querySelector('.start-window')
    const setingsMenu = document.querySelector('.setings-menu')
    const blackout = document.querySelector('#blackout')
    const menuAndSection = document.querySelector('.menu-and-section')

    if (startWindow.classList.length === 1) {
        startWindow.classList.toggle('no-active');
        setingsMenu.classList.toggle('window-menu')
        setingsMenu.classList.toggle('no-burger-menu')
        startWindow.classList.toggle('menu-and-section');
    } else {
        if (menuAndSection) {
            startWindow.classList.toggle('menu-and-section');
            setingsMenu.classList.toggle('no-burger-menu')
            setingsMenu.classList.toggle('window-menu')
            startWindow.classList.toggle('no-active');
        } else {
            setingsMenu.classList.toggle('window-menu')
            blackout.classList.toggle('blackout');
            setingsMenu.classList.toggle('no-burger-menu')
        }
    }

    menu(audioPlay)
}

function checkBtnAudio(audioPlay) {
    const stateRange = localStorage.getItem('stateRange')
    if (stateRange === '1') {
        // audioPlay.setAttribute('muted', false)
        audioPlay.setAttribute('allow', "autoplay");
        audioPlay.play()
    } else {
        audioPlay.pause()
    }

    audioPlay.addEventListener('ended', () => audioPlay.play())
}