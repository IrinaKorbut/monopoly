import { createCell, addWindow, addSelectorClass } from '../cellsCards/cellCardConst';
import { createElement, appendElementTo } from '../../helpFunctions/helpFunctions'

export function addHint() {
    hint('slideThree', 'F9')
    hint('subjectBtn', 'F4')
    hint('volumeInput', '- / +')
   // hint('btn-close', 'Esc')

}

function hint(selector: string, text: string) {
    const subjectInput = document.querySelector(`.${selector}`)
    subjectInput.addEventListener('mouseenter', (event) => btnHint(event, `${text}`));
    subjectInput.addEventListener('mouseleave', removeCardStreet);
}

function btnHint(event: any, inerText: string) {
    const hint: HTMLElement = document.querySelector('.hint')
    const hintF9 = createElement('div', ['hints'], `${inerText}`)

    appendElementTo(hint, hintF9)
    addWindow(event.target, hintF9)
}

export function removeCardStreet() {
    const tooltipElem = document.querySelector('.hints')
    if (tooltipElem) {
        tooltipElem.remove();
    }
}