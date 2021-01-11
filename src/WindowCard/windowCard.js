import { addSelectorClass } from './windowCardConst';
import './windowCard.scss';


export function removeCardStreet() {
    if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
    }
}

export function initWindowCards() {
    addSelectorClass('street', cardStreet);
    addSelectorClass('railroad', cardRailroad);
    addSelectorClass('communal', cardCompany);
}