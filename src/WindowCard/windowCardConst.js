import { removeCardStreet } from './windowCard';

export function createElementAdd(elementType, elementsClassList, elementInnerText) {
    const element = document.createElement(elementType);
    element.classList.add(elementsClassList);
    if (elementInnerText) {
        element.innerText = elementInnerText;
    }
    return element;
}

export function createCell(className, divText, cellText) {
    const cell = createElementAdd('div', className, divText);
    const cellInnerText = createElementAdd('p', 'cost', cellText);
    appendElementTo(cell, cellInnerText);
    return cell;
}

export function appendElementTo(parent, ...elements) {
    if (parent) {
        elements.forEach((element) => parent.append(element));
    }
}

export function addWindow(target, tooltipEle) {
    let coords = target.getBoundingClientRect();

    let left = coords.left + (target.offsetWidth - tooltipEle.offsetWidth) / 2;
    if (left < 0) left = 0;

    let top = coords.top - tooltipEle.offsetHeight - 5;
    if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
    }

    tooltipEle.style.left = left + 'px';
    tooltipEle.style.top = top + 'px';
}

export function addSelectorClass(classNames, fuNames) {
    let street = document.querySelectorAll(`.${classNames}`)
    for (let i = 0; i < street.length; i++) {
        street[i].addEventListener('mouseenter', (event) => fuNames(event));
        street[i].addEventListener('mouseleave', removeCardStreet)
    }
}