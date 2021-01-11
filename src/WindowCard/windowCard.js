import { createElementAdd, createCell, appendElementTo, addWindow, addSelectorClass } from './windowCardConst';
import Game from '../Game/Game';
import './windowCard.scss';

let tooltipElem;

export function cardStreet(event) {
    const game = new Game()
    let target = event.target;

    let property;
    for (let i = 0; i < game.cells.length; i += 1) {
        const cell = game.cells[i];
        if (cell.position === Number(target.id)) {
            property = cell;
            break;
        }
    }

    tooltipElem = createElementAdd('div', 'tooltip')
    let wrapperCard = createElementAdd('div', 'wrapper-card')
    let wrapperColor = createElementAdd('div', 'wrapper-color')
    wrapperColor.classList.add(target.children[0].classList[1])
    let wrapperColorName = createElementAdd('div', 'wrapper-color-name', property.name)

    let infoRents = createElementAdd('div', 'info-rents')
    let rent = createCell('rent', 'Rent', `$ ${property.rent}`)
    let rentWithColorSet = createCell('rent-with-color-set', 'Rent with color set', `$ ${property.rent * 2}`)

    let rentWithOne = createCell('rent-with-one', 'with 1 hause', `$ ${property.rentWithOneHouse}`)
    let rentWithTwo = createCell('rent-with-two', 'with 2 hauses', `$ ${property.rentWhithTwoHouses}`)
    let rentWithThree = createCell('rent-with-three', 'with 3 hauses', `$ ${property.rentWithTreeHouses}`)
    let rentWithFour = createCell('rent-with-four', 'with 4 hauses', `$ ${property.rentWhithFourHouses}`)
    let rentWithFive = createCell('rent-with-five', 'with HOTEL', `$ ${property.rentWhithHotel}`)

    let housest = createElementAdd('div', 'housest')
    let housestCost = createCell('housest-cost', 'Housest cost', `$ ${property.houseCost}`)
    let hotelsCost = createCell('hotels-cost', 'Hotels cost', `$ ${property.houseCost}`)

    appendElementTo(document.body, tooltipElem)
    appendElementTo(tooltipElem, wrapperCard)
    appendElementTo(wrapperCard, wrapperColor)
    appendElementTo(wrapperColor, wrapperColorName)
    appendElementTo(wrapperCard, infoRents)
    appendElementTo(infoRents, rent, rentWithColorSet, rentWithOne, rentWithTwo, rentWithThree, rentWithFour, rentWithFive)
    appendElementTo(wrapperCard, housest)
    appendElementTo(housest, housestCost, hotelsCost)

    addWindow(target, tooltipElem)
}

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