import { removeCardStreet } from './windowCard';

export function addSelectorClass(classNames, fuNames) {
    let street = document.querySelectorAll(`.${classNames}`)
    for (let i = 0; i < street.length; i++) {
        street[i].addEventListener('mouseenter', (event) => fuNames(event));
        street[i].addEventListener('mouseleave', removeCardStreet)
    }
}