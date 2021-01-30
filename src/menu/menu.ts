import { createElement, appendElementTo } from '../helpFunctions/helpFunctions'
import { startWindow } from '../StartWindow/startWindow';
import Game from '../Game/Game';

function menu(audioPlay: HTMLAudioElement) {
    const setingMenu: HTMLElement = document.querySelector('.setings-menu')
    setingMenu.innerHTML = '';
    const currentLanguage: string = localStorage.getItem('language')

    const heder = createElement('div', ['heder'])
    const btnClose = createElement('div', ['btn-close'], 'x')
    const menu = createElement('div', ['name-menu'], 'Menu')
    if(currentLanguage === 'RU'){
        menu.textContent = 'Меню'
    }else if(currentLanguage === 'BEL'){
        menu.textContent = 'Меню'
    }

    const nameBtn = createElement('div', ['name-btn'])

    const setings = createElement('div', ['name-setings'], 'Settings')
    if(currentLanguage === 'RU'){
        setings.textContent = 'Настройки'
    }else if(currentLanguage === 'BEL'){
        setings.textContent = 'Налады'
    }

    const language = createElement('div', ['language'], 'Language') //удалить
    const newPlay = createElement('div', ['new-play'], 'New Game')
    if(currentLanguage === 'RU'){
        newPlay.textContent = 'Новая игра'
    }else if(currentLanguage === 'BEL'){
        newPlay.textContent = 'Новая гульня'
    }
    const options = createElement('div', ['options'])

    appendElementTo(setingMenu, heder, nameBtn)
    appendElementTo(heder, menu, btnClose)
    appendElementTo(nameBtn, setings, language, newPlay, options)

    setings.addEventListener('click', () => setingsMeny(setingMenu, nameBtn, menu, setings, audioPlay, currentLanguage))
    newPlay.addEventListener('click', newPlayFn)
    btnClose.addEventListener('click', () => classMenu(audioPlay))
}

function newPlayFn() {
    Game.players.forEach(player => {
        player.chip.remove()
        player.playerCard.remove()
    })
    Game.players = []
    Game.cells.forEach((cell: any) => {
        if (cell.type === 'street' || cell.type === 'railroad' || cell.type === 'communal') {
            cell.owner = null
            cell.isAvailableToBuyHouse = false;
            cell.numberOfHouses = 0;
            cell.isThereHotel = false;

            document.querySelectorAll('.house').forEach(hous => hous.remove())
            document.querySelector('.action-list').innerHTML = "";
            const propertyViewCost: HTMLElement = cell.element.querySelector('.cost');
            const ownerColor: HTMLElement = cell.element.querySelector('.owner');
            ownerColor.style.backgroundColor = '#c0c0c0';
            propertyViewCost.innerText = `$${cell.cost}`;
        }
    })

    document.querySelector('.setings-menu').classList.toggle('no-burger-menu')
    document.querySelector('.setings-menu').classList.toggle('window-menu')
    document.querySelector('.start-window').classList.toggle('no-active');

    startWindow()
}

function setingsMeny(setingMenu: HTMLElement, classOptions: HTMLElement, menus: HTMLElement, setings: HTMLElement, audioPlay: HTMLAudioElement, currentLanguage: string): void {
    menus.textContent = setings.textContent
    classOptions.innerHTML = '';

    const audio = createElement('div', ['audio'], 'Audio')
    if(currentLanguage === 'RU'){
        audio.textContent = 'Аудио'
    }else if(currentLanguage === 'BEL'){
        audio.textContent = 'Аўдыё'
    }
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
    if(currentLanguage === 'RU'){
        volume.textContent = 'Громость'
    }else if(currentLanguage === 'BEL'){
        volume.textContent = 'Громость'
    }
    const volumeLabel = createElement('label', ['volumeLabel'])
    const volumeInput = createElement('input', ['volumeInput'])
    volumeInput.setAttribute('type', "range");
    volumeInput.setAttribute('min', "0");
    volumeInput.setAttribute('max', "1");
    volumeInput.setAttribute('step', "0.1");

    let volumeValue = localStorage.getItem('volume')
    volumeInput.value = volumeValue || 0.5

    const subject = createElement('div', ['subject'], 'Theme')
    if(currentLanguage === 'RU'){
        subject.textContent = 'Тема'
    }else if(currentLanguage === 'BEL'){
        subject.textContent = 'Тэма'
    }
    const subjectBtn = createElement('div', ['subjectBtn'])
    const subjectInput = createElement('input', ['subjectInput'])

    let subjectLocalStor = localStorage.getItem('subject')
    subjectInput.checked = Boolean(+subjectLocalStor)

    subjectInput.id = 'subjectBtn'
    subjectInput.type = "checkbox"
    const subjectLabel = createElement('label', ['subjectLabel'])
    subjectLabel.setAttribute('for', "subjectBtn")

    const back = createElement('div', ['Back'], 'Back')
    if(currentLanguage === 'RU'){
        back.textContent = 'Назад'
    }else if(currentLanguage === 'BEL'){
        back.textContent = 'Назад'
    }

    appendElementTo(setingMenu, back)
    appendElementTo(classOptions, audio, volume, subject)

    appendElementTo(audio, audioBtn)
    appendElementTo(audioBtn, audioInput, audioLabel)
    appendElementTo(volume, volumeLabel, volumeInput)
    appendElementTo(subject, subjectBtn)
    appendElementTo(subjectBtn, subjectInput, subjectLabel)

    audioFn(audioPlay)

    back.addEventListener('click', menu)
    subjectInput.addEventListener('click', (e: any) => subjectLocalStorage(e.target))
}

function subjectLocalStorage(subjectInput?: HTMLInputElement) {
    const subjectLS = localStorage.getItem('subject')

    if(subjectLS === '1'){
       if(subjectInput) subjectInput.checked = false
        localStorage.setItem('subject', '0');
    }else{
        if(subjectInput) subjectInput.checked = true
        localStorage.setItem('subject', '1');
    }

    addSubject()
}

function addSubject() {
    document.querySelector('.players-cards').classList.toggle('dark-style');
    document.querySelector('.addition-section').classList.toggle('dark-style');
    document.querySelector('.game-field').classList.toggle('dark-style');
    document.querySelector('.history-and-buying-section').classList.toggle('dark-style');
    document.querySelector('.buying-section').classList.toggle('dark-style');
}

function polz(audio: HTMLAudioElement, volumeInputElem: any) {
    localStorage.setItem('volume', volumeInputElem.value);
    audio.volume = volumeInputElem.value
}

function audioFn(audioPlay: HTMLAudioElement) {
    const audioBtn = document.querySelector('.slideThreeInput')
    let volumeInput = document.querySelector('.volumeInput');

    volumeInput.addEventListener('click', (e) => polz(audioPlay, e.target))
    audioBtn.addEventListener('click', (e) => audioRepeat(audioPlay, <HTMLInputElement>e.target))
}

function audioRepeat(audio: HTMLAudioElement, audioBtnElem: HTMLInputElement) {
    localStorage.setItem('stateRange', String(Number(audioBtnElem.checked)));
    checkBtnAudio(audio)
}

export function keyEsc(audioPlay: HTMLAudioElement) {
    document.addEventListener('keydown', (event) => {
        const audioBtn: HTMLInputElement = document.querySelector('.slideThreeInput')
        const subjectInput: HTMLInputElement = document.querySelector('.subjectInput')
        const volumeInputs: any = document.querySelector('.volumeInput');

        if (event.code === 'Escape') {
            classMenu(audioPlay)
        }

        if (event.code === 'F9') {
            localStorage.setItem('stateRange', String(Number(audioPlay.paused)));

            checkBtnAudio(audioPlay)

            if (audioBtn) {
                audioBtn.checked ? audioBtn.checked = false : audioBtn.checked = true
                audioRepeat(audioPlay, audioBtn)
            }
        }

        if (event.code === 'F4') {
            subjectLocalStorage(subjectInput)
        }

        if (event.code === 'NumpadAdd') {  //+  
            if (audioPlay.volume < 0.99) {
                audioPlay.volume += 0.1
                localStorage.setItem('volume', String(audioPlay.volume));
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
                localStorage.setItem('volume', String(audioPlay.volume));
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
    const currentLanguage: string = localStorage.getItem('language')
    const btnMenu = document.querySelector('.btn-Menu')
    if(currentLanguage === 'RU'){
        btnMenu.textContent = 'Меню'
    }else if(currentLanguage === 'BEL'){
        btnMenu.textContent = 'Меню'
    }
    const audioPlay = new Audio('./audio/Ennio-Morricone.mp3')
    btnMenu.addEventListener('click', () => classMenu(audioPlay))
    keyEsc(audioPlay)
    checkBtnAudio(audioPlay)

    const blackout = document.querySelector('#blackout')
    blackout.addEventListener('click', () => clickBlackout(audioPlay))

    const subjectLS = localStorage.getItem('subject')
    if(subjectLS === '1') {
        addSubject()
    }
}

function clickBlackout(audioPlay: HTMLAudioElement) {
    const startWindow = document.querySelector('.start-window')
    const setingsMenu = document.querySelector('.setings-menu')

    if (startWindow.classList[2] === 'menu-and-section' && setingsMenu.classList[1] === 'window-menu') {
        classMenu(audioPlay)
    }
    if (startWindow.classList[1] === 'no-active' && setingsMenu.classList[1] === 'window-menu') {
        classMenu(audioPlay)
    }
}

function classMenu(audioPlay: HTMLAudioElement): void {
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

function checkBtnAudio(audioPlay: HTMLAudioElement): void {
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