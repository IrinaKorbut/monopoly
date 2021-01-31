
export function switchLanguage() {
    btnMenu()
    startWindow()
    menu()
}

function constLanguage(name: HTMLElement, a: string, b: string, c: string) {
    const currentLanguage: string = localStorage.getItem('language')

    if (currentLanguage === 'EN') {
        name.firstChild.textContent = `${a}`;
    } else if (currentLanguage === 'RU') {
        name.firstChild.textContent = `${b}`;
    } else {
        name.firstChild.textContent = `${c}`; 
    }
}

function constLanguagePlaceholder(name: HTMLInputElement, a: string, b: string, c: string) {
    const currentLanguage: string = localStorage.getItem('language')

    if (currentLanguage === 'EN') {
        name.placeholder = `${a}`;
    } else if (currentLanguage === 'RU') {
        name.placeholder = `${b}`;
    } else {
        name.placeholder = `${c}`;
    }
}

function constLanguageContent(name: HTMLElement, a: string, b: string, c: string) {
    const currentLanguage: string = localStorage.getItem('language')

    if (currentLanguage === 'EN') {
        name.textContent = `${a}`; 
    } else if (currentLanguage === 'RU') {
        name.textContent = `${b}`;
    } else {
        name.textContent = `${c}`; 
    }
}


function btnMenu(): void {
    const menu: HTMLElement = document.querySelector('.btn-Menu')
    constLanguage(menu, 'Menu', 'Меню', 'Меню')
}

function startWindow() {
    const numberPlayers: HTMLElement = document.querySelector('.number-players')
    constLanguage(numberPlayers, 'Select number of players:', 'Выберите количество игроков:', 'Выберыце колькасць гульцоў:')

    const gamekoiDisabl: HTMLElement = document.querySelector('.num');
    constLanguage(gamekoiDisabl, 'num', 'число', 'нумар')

    const playerInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('.player-input')
    playerInput.forEach(input => constLanguagePlaceholder(input, 'Player', 'Игрок', 'Гулец'))

    const selectColorDisabl: NodeListOf<HTMLInputElement> = document.querySelectorAll('.disabled');
    selectColorDisabl.forEach(color => constLanguage(color, 'Color', 'Цвет', 'Колер'))
    
    const selectColorUan: NodeListOf<HTMLInputElement> = document.querySelectorAll('.red');
    selectColorUan.forEach(e => constLanguageContent(e, 'Red', 'Красный', 'Чырвоны'))
    
    const selectColorTuo: NodeListOf<HTMLInputElement> = document.querySelectorAll('.blue');
    selectColorTuo.forEach(e => constLanguageContent(e, 'Blue', 'Синий', 'Сіні'))

    const selectColorThree: NodeListOf<HTMLInputElement> = document.querySelectorAll('.orange');
    selectColorThree.forEach(e => constLanguageContent(e, 'Orange', 'Оранжевый', 'Аранжавы'))

    const selectColorFour: NodeListOf<HTMLInputElement> = document.querySelectorAll('.green');
    selectColorFour.forEach(e => constLanguageContent(e, 'Green', 'Зеленый', 'Зялёны'))

    const iconName: NodeListOf<HTMLInputElement> = document.querySelectorAll('.icon-name');
    iconName.forEach(e => constLanguage(e, 'P', 'И', 'Г'))
   
    const selectHuman: NodeListOf<HTMLInputElement> = document.querySelectorAll('.numHuman');
    selectHuman.forEach(e => constLanguage(e, 'Human', 'Человек', 'Чалавек'))
    
    const selectAi: NodeListOf<HTMLInputElement> = document.querySelectorAll('.numComputer');
    selectAi.forEach(e => constLanguage(e, 'Computer', 'Компьютер', "Камп'ютар"))
    
    const btnStart: HTMLElement = document.querySelector('.btn-start');
    constLanguage(btnStart, 'Start game', 'Начать игру', 'Пачаць гульню')
}

function menu() {

    const nameMenu: HTMLElement = document.querySelector('.name-menu');

    if (nameMenu.textContent === 'Settings' || nameMenu.textContent === 'Настройки' || nameMenu.textContent === 'Налады') {
        constLanguage(nameMenu, 'Settings', 'Настройки', 'Налады')
    } else {
        constLanguage(nameMenu, 'Menu', 'Меню', 'Меню')
    }

    const audio: HTMLElement = document.querySelector('.audio');
    constLanguage(audio, 'Audio', 'Аудио', 'Аўдыё')

    const volume: HTMLElement = document.querySelector('.volume');
    constLanguage(volume, 'Volume', 'Громость', 'Громость')

    const subject: HTMLElement = document.querySelector('.subject');
    constLanguage(subject, 'Dark theme', 'Tемная тема', 'Цёмная тэма')

    const languageTitle: HTMLElement = document.querySelector('.language__title');
    constLanguage(languageTitle, 'Language', 'Язык', 'Мова')

    const back: HTMLElement = document.querySelector('.back');
    constLanguage(back, 'Back', 'Назад', 'Назад')
}