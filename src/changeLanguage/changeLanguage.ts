
import cell from '../cell/cell';
import cells from '../cells/cells';
import { changePledgeBtnLanguage } from '../pledge/pledge';
import { changeBuyoutBtnLanguage } from '../buyout/buyout';
import { changeSellHouseLanguage } from '../sellHouse/sellHouse';
import  { changeBuyHouseLanguage } from '../buyHouse/buyHouse';

import { switchLanguage } from '../switchLanguage/switchLanguage';
import changeDialogWindowLanguage from '../dialogWindow/changeDialogWindowLanguage';

export function changeTitleOnCell(): void {
    const currentLanguage: string = localStorage.getItem('language') || 'EN';
    cells.forEach((cell: cell) => {
        const cellTitle: HTMLElement = cell.element.querySelector('.title');       
        let titleJailVisitSection:  HTMLElement;
        if (cell.position === 10) {
            titleJailVisitSection = <HTMLElement>cell.element.querySelectorAll('.title')[1];
        }
        if (currentLanguage === 'RU') {
            cellTitle.innerText = cell.russianName;
            if (cell.position === 10) {
                titleJailVisitSection.innerText = 'Посещение';
            }
        } else if (currentLanguage === 'BEL') {
            cellTitle.innerText = cell.belarusianName;
            if (cell.position === 10) {
                titleJailVisitSection.innerText = 'Наведванне';
            }
        } else if (currentLanguage === 'EN') {
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
        localStorage.setItem('language', input.value);
        changeTitleOnCell();
        changeBuyHouseLanguage();
        changeSellHouseLanguage();
        switchLanguage()
        changeDialogWindowLanguage();
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
    changeTitleOnCell();
}
