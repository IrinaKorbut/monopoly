import { removeCardStreet } from './cellCard';
import { createElement, appendElementTo } from '../../helpFunctions/helpFunctions'

export function createCell(className: string, divText: string, cellText: string) {
    const cell = createElement('div', [className], divText);
    const cellInnerText = createElement('p', ['cost'], cellText);
    appendElementTo(cell, cellInnerText);
    return cell;
}

export function addWindow(target: HTMLElement, tooltipEle: HTMLElement): void {
    const coords = target.getBoundingClientRect();

    let left = coords.left + (target.offsetWidth - tooltipEle.offsetWidth) / 2;
    if (left < 0) left = 0;

    let top = coords.top - tooltipEle.offsetHeight - 5;
    if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
    }

    tooltipEle.style.left = left + 'px';
    tooltipEle.style.top = top + 'px';
}

export function addSelectorClass(classNames: string, fuNames: (event: Event, tooltipElem: HTMLElement) => void): void {
    let tooltipElem: HTMLElement;
    const street = document.querySelectorAll(`.${classNames}`)
    for (let i = 0; i < street.length; i++) {
        street[i].addEventListener('mouseenter', (event) => fuNames(event, tooltipElem));
        street[i].addEventListener('mouseleave', removeCardStreet)
    }
}