import initBuyHouseButton from '../buyHouse/buyHouse';

import Cell from '../Cell/Cell';
import cells from '../cells/cells';

function changeTitleOnCell(language: string): void {
    cells.forEach((Cell: Cell) => {
        const cellTitle: HTMLElement = Cell.element.querySelector('.title');        
        if (language === 'RU') {
            localStorage.setItem('language', 'RU');
            cellTitle.innerText = Cell.russianName;
        } else if (language === 'BEL') {
            localStorage.setItem('language', 'BEL');
            cellTitle.innerText = Cell.belarusianName;
        } else if (language === 'EN') {
            localStorage.setItem('language', 'EN');
            cellTitle.innerText = Cell.name;
        }
    })
}

function addListenerToButtonLng(): void {
    const languageSection: HTMLElement = document.querySelector('.language');
    languageSection.addEventListener('click', (event) => {
        let input = (<HTMLElement>event.target).closest('input');
        if (!input) return;
        if (!languageSection.contains(input)) return;
        changeTitleOnCell(input.value);
        initBuyHouseButton();
    })
}

function selectCurrentInput(): void {
    const buttonsLanguage: Array<HTMLElement> = Array.from(document.querySelectorAll('.radio_language'));
    const currentLanguage: string = localStorage.getItem('language');
    buttonsLanguage.forEach((btn: HTMLInputElement) => {
        if (btn.value === currentLanguage) {
            btn.checked = true;
            return;
        }
    })
}

export default function setLanguage(): void {
    selectCurrentInput();    
    addListenerToButtonLng();
    changeTitleOnCell(localStorage.getItem('language') || 'EN');
}
