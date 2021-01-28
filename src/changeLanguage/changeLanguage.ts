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
    const buttonLanguage: Array<HTMLElement> = Array.from(document.querySelectorAll('.radio_language'));
    buttonLanguage.forEach((btn: HTMLInputElement) => {
        btn.addEventListener('click', () => {
            changeTitleOnCell(btn.value);
            initBuyHouseButton();
        })
    })
}

export default function setLanguage(): void {
    changeTitleOnCell(localStorage.getItem('language') || 'EN');
    addListenerToButtonLng()
}