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

export function cardRailroad(event) {
    let target = event.target;
    tooltipElem = createElementAdd('div', 'card-tax')
    let image = createElementAdd('img', 'image')
    image.src = target.children[0].attributes[0].value
    let nameRailroad = createElementAdd('div', 'name-railroad', 'Reading Railroad')
    let rentalInstruction = createElementAdd('div', 'rental-instruction')
    let rent = createCell('rent', 'Rent', '$25')
    let owner = createElementAdd('div', 'owner', 'OWNER:')
    let ownerTwo = createCell('owner-two', '2 transport objects', '$50')
    let ownerThree = createCell('owner-three', '3 transport objects', '$100')
    let ownerFour = createCell('owner-four', '4 transport objects', '$200')

    appendElementTo(document.body, tooltipElem)
    appendElementTo(tooltipElem, image)
    appendElementTo(tooltipElem, nameRailroad)
    appendElementTo(tooltipElem, rentalInstruction)
    appendElementTo(rentalInstruction, rent, owner, ownerTwo, ownerThree, ownerFour)
    addWindow(target, tooltipElem)
}

export function cardCompany(event) {
    let target = event.target;
    tooltipElem = createElementAdd('div', 'company')
    let image = createElementAdd('img', 'image')
    image.src = target.children[0].attributes[0].value
    let nameCompany = createElementAdd('div', 'name-company', `${target.children[1].innerText}`)
    let companyInstructionOne = createElementAdd('div', 'company-instruction-one', 'If the player has one business, then the rent is four times the result of the die roll.')

    let companyInstructionTwo = createElementAdd('div', 'company-instruction-two', 'If the player owns both businesses, the rent is ten times the result of the die roll.')

    appendElementTo(document.body, tooltipElem)
    appendElementTo(tooltipElem, image, nameCompany, companyInstructionOne, companyInstructionTwo)
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