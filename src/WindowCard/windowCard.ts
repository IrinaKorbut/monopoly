import { createCell, addWindow, addSelectorClass } from './windowCardConst';
import { createElement, appendElementTo } from '../helpFunctions/helpFunctions'
import game from '../Game/Game';
import Cell from '../Cell/Cell';

import './windowCard.scss';

function addStuleBaground(nameCompany: HTMLElement, colorCard: string) {
    const classStyleDarc = document.querySelector('.dark-style')
    nameCompany.style.background = classStyleDarc ? `${colorCard}` : '#fff'
}

export function cardStreet(event: Event, tooltipElem: HTMLElement) {
    const target = <HTMLInputElement>event.target;

    let property: any;
    for (let i = 0; i < game.cells.length; i += 1) {
        const cell = game.cells[i];
        if (cell.position === Number(target.id)) {
            property = cell;
            break;
        }
    }

    tooltipElem = createElement('div', ['tooltip', 'tooltips'])
    const wrapperCard = createElement('div', ['wrapper-card'])
    const wrapperColor = createElement('div', ['wrapper-color', `${target.children[0].classList[1]}`])
    const wrapperColorName = createElement('div', ['wrapper-color-name'], property.name)

    const infoRents = createElement('div', ['info-rents'])
    const rent = createCell('rent', 'Rent', `$ ${property.rent}`)
    const rentWithColorSet = createCell('rent-with-color-set', 'Rent with color set', `$ ${property.rent * 2}`)

    const rentWithOne = createCell('rent-with-one', 'with 1 hause', `$ ${property.rentWithOneHouse}`)
    const rentWithTwo = createCell('rent-with-two', 'with 2 hauses', `$ ${property.rentWhithTwoHouses}`)
    const rentWithThree = createCell('rent-with-three', 'with 3 hauses', `$ ${property.rentWithTreeHouses}`)
    const rentWithFour = createCell('rent-with-four', 'with 4 hauses', `$ ${property.rentWhithFourHouses}`)
    const rentWithFive = createCell('rent-with-five', 'with HOTEL', `$ ${property.rentWhithHotel}`)

    const housest = createElement('div', ['housest'])
    const housestCost = createCell('housest-cost', 'Housest cost', `$ ${property.houseCost}`)
    const hotelsCost = createCell('hotels-cost', 'Hotels cost', `$ ${property.houseCost}`)

    appendElementTo(document.body, tooltipElem)
    appendElementTo(tooltipElem, wrapperCard)
    appendElementTo(wrapperCard, wrapperColor)
    appendElementTo(wrapperColor, wrapperColorName)
    appendElementTo(wrapperCard, infoRents)
    appendElementTo(infoRents, rent, rentWithColorSet, rentWithOne, rentWithTwo, rentWithThree, rentWithFour, rentWithFive)
    appendElementTo(wrapperCard, housest)
    appendElementTo(housest, housestCost, hotelsCost)

    addWindow(target, tooltipElem)
    addStuleBaground(tooltipElem, '#C6CACC')
}

export function cardRailroad(event: Event, tooltipElem: HTMLElement) {
    const target = <HTMLInputElement>event.target;

    tooltipElem = createElement('div', ['card-tax', 'tooltips'])
    const image: HTMLImageElement = createElement('img', ['image'])
    image.src = target.children[0].attributes[0].value

    const nameRailroad = createElement('div', ['name-railroad'], `${target.children[1].textContent}`)
    const rentalInstruction = createElement('div', ['rental-instruction'])
    const rent = createCell('rent', 'Rent', '$25')
    const owner = createElement('div', ['owner'])
    const ownerTwo = createCell('owner-two', 'If 2 owned', '$50')
    const ownerThree = createCell('owner-three', 'If 3 owned', '$100')
    const ownerFour = createCell('owner-four', 'If 4 owned', '$200')

    appendElementTo(document.body, tooltipElem)
    appendElementTo(tooltipElem, image)
    appendElementTo(tooltipElem, nameRailroad)
    appendElementTo(tooltipElem, rentalInstruction)
    appendElementTo(rentalInstruction, rent, owner, ownerTwo, ownerThree, ownerFour)

    addWindow(target, tooltipElem)
    addStuleBaground(tooltipElem, '#DEB887')
}

export function cardCompany(event: any, tooltipElem: HTMLElement) {
    const target = event.target;

    tooltipElem = createElement('div', ['company', 'tooltips'])
    const image = createElement('img', ['image'])
    image.src = target.children[0].attributes[0].value

    const nameCompany = createElement('div', ['name-company'], `${target.children[1].innerText}`)
    const companyInstructionOne = createElement('div', ['company-instruction-one'], 'If the player has one business, then the rent is four times the result of the die roll.')
    const companyInstructionTwo = createElement('div', ['company-instruction-two'], 'If the player owns both businesses, the rent is ten times the result of the die roll.')

    appendElementTo(document.body, tooltipElem)
    appendElementTo(tooltipElem, image, nameCompany, companyInstructionOne, companyInstructionTwo)

    addWindow(target, tooltipElem)
    addStuleBaground(tooltipElem, '#C6CACC')
}

export function removeCardStreet() {
   const tooltipElem = document.querySelector('.tooltips')
    if (tooltipElem) {
        tooltipElem.remove();
    }
}

export function initWindowCards() {
    addSelectorClass('street', cardStreet);
    addSelectorClass('railroad', cardRailroad);
    addSelectorClass('communal', cardCompany);
}