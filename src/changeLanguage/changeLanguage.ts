import initBuyHouseButton from '../buyHouse/buyHouse';

import cell from '../cell/cell';
import cells from '../cells/cells';
import Game from '../Game/Game'
import { changePledgeBtnLanguage } from '../pledge/pledge';
import { changeBuyoutBtnLanguage } from '../buyout/buyout';

function changeTitleOncell(language: string): void {
    cells.forEach((cell: cell) => {
        const cellTitle: HTMLElement = cell.element.querySelector('.title');       
        let titleJailVisitSection:  HTMLElement;
        if (cell.position === 10) {
            titleJailVisitSection = <HTMLElement>cell.element.querySelectorAll('.title')[1];
        }
        if (language === 'RU') {            
            localStorage.setItem('language', 'RU');
            cellTitle.innerText = cell.russianName;
            if (cell.position === 10) {
                titleJailVisitSection.innerText = 'Посещение';
            }
        } else if (language === 'BEL') {
            localStorage.setItem('language', 'BEL');
            cellTitle.innerText = cell.belarusianName;
            if (cell.position === 10) {
                titleJailVisitSection.innerText = 'Наведванне';
            }
        } else if (language === 'EN') {
            localStorage.setItem('language', 'EN');
            cellTitle.innerText = cell.name;
            if (cell.position === 10) {
                titleJailVisitSection.innerText = 'Visiting';
            }
        }
    })
}

export function addListenerToButtonLng(): void {
    const languageSection: HTMLElement = document.querySelector('.language-choose');
    languageSection.addEventListener('click', (event) => {
        let input = (<HTMLElement>event.target).closest('input');
        if (!input) return;
        if (!languageSection.contains(input)) return;
        changeTitleOncell(input.value);
        if (Game.players.length) {
            initBuyHouseButton();
        }
        changePledgeBtnLanguage();
        changeBuyoutBtnLanguage();
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
function isRadioButtonLanguageExist(): boolean {
    const buttonsLanguage: Array<HTMLElement> = Array.from(document.querySelectorAll('.radio_language'));
    return !!buttonsLanguage; 
}

export default function setLanguage(): void {
    if(isRadioButtonLanguageExist()){
        selectCurrentInput(); 
    } 
    addListenerToButtonLng();
    changeTitleOncell(localStorage.getItem('language') || 'EN');
}
