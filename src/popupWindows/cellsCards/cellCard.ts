import { createCell, addWindow, addSelectorClass } from './cellCardConst';
import { createElement, appendElementTo } from '../../helpFunctions/helpFunctions'
import game from '../../entities/Game/Game';

import './cellCard.scss';

function addStuleBaground(nameCompany: HTMLElement, colorCard: string, colorCardWil?: string) {
    const classStyleDarc = document.querySelector('.dark-style')
    nameCompany.style.background = classStyleDarc ? `${colorCard}` : `${colorCardWil}`|| '#fff'
}

export function cardStreet(event: Event, tooltipElem: HTMLElement) {
    const target = <HTMLInputElement>event.target;
    const currentLanguage: string = localStorage.getItem('language')

    tooltipElem = createElement('div', ['tooltip', 'tooltips'])
    const wrapperCard = createElement('div', ['wrapper-card'])
    const wrapperColor = createElement('div', ['wrapper-color', `${target.children[0].classList[1]}`])
    const wrapperColorName = createElement('div', ['wrapper-color-name'], (<HTMLElement>target.children[1]).textContent)

    const infoRents = createElement('div', ['info-rents'])
    const rent = createCell('rent', 'Rent', `$ ${classGame(target).rent}`)
    if(currentLanguage === 'RU'){
        rent.firstChild.textContent = 'Аренда'
    }else if(currentLanguage === 'BEL'){
        rent.firstChild.textContent = 'Арэнда'
    }

    const rentWithColorSet = createCell('rent-with-color-set', 'Rent with color set', `$ ${classGame(target).rent * 2}`)
    if(currentLanguage === 'RU'){
        rentWithColorSet.firstChild.textContent = 'С набором цветов'
    }else if(currentLanguage === 'BEL'){
        rentWithColorSet.firstChild.textContent = 'З каляровым наборам'
    }

    const rentWithOne = createCell('rent-with-one', 'with 1 hause', `$ ${classGame(target).rentWithOneHouse}`)
    if(currentLanguage === 'RU'){
        rentWithOne.firstChild.textContent = 'С 1 домом'
    }else if(currentLanguage === 'BEL'){
        rentWithOne.firstChild.textContent = 'З 1 будынкам'
    }
    const rentWithTwo = createCell('rent-with-two', 'with 2 hauses', `$ ${classGame(target).rentWhithTwoHouses}`)
    if(currentLanguage === 'RU'){
        rentWithTwo.firstChild.textContent = 'С 2 домом'
    }else if(currentLanguage === 'BEL'){
        rentWithTwo.firstChild.textContent = 'З 2 будынкам'
    }
    const rentWithThree = createCell('rent-with-three', 'with 3 hauses', `$ ${classGame(target).rentWithTreeHouses}`)
    if(currentLanguage === 'RU'){
        rentWithThree.firstChild.textContent = 'С 3 домом'
    }else if(currentLanguage === 'BEL'){
        rentWithThree.firstChild.textContent = 'З 3 будынкам'
    }
    const rentWithFour = createCell('rent-with-four', 'with 4 hauses', `$ ${classGame(target).rentWhithFourHouses}`)
    if(currentLanguage === 'RU'){
        rentWithFour.firstChild.textContent = 'С 4 домом'
    }else if(currentLanguage === 'BEL'){
        rentWithFour.firstChild.textContent = 'З 4 будынкам'
    }
    const rentWithFive = createCell('rent-with-five', 'with HOTEL', `$ ${classGame(target).rentWhithHotel}`)
    if(currentLanguage === 'RU'){
        rentWithFive.firstChild.textContent = 'С отелем'
    }else if(currentLanguage === 'BEL'){
        rentWithFive.firstChild.textContent = 'З гатэлем'
    }
    const housest = createElement('div', ['housest'])
    const housestCost = createCell('housest-cost', 'Housest cost', `$ ${classGame(target).houseCost}`)
    if(currentLanguage === 'RU'){
        housestCost.firstChild.textContent = 'Стоимость дома'
    }else if(currentLanguage === 'BEL'){
        housestCost.firstChild.textContent = 'Кошт дома'
    }
    const hotelsCost = createCell('hotels-cost', 'Hotels cost', `$ ${classGame(target).houseCost}`)
    if(currentLanguage === 'RU'){
        hotelsCost.firstChild.textContent = 'Стоимость отеля'
    }else if(currentLanguage === 'BEL'){
        hotelsCost.firstChild.textContent = 'Гасцініца каштуе'
    }

    const pledge = createCell('pledge', 'Pledge', `$ ${classGame(target).pledgePrice}`)
    if(currentLanguage === 'RU'){
        pledge.firstChild.textContent = 'Залог'
    }else if(currentLanguage === 'BEL'){
        pledge.firstChild.textContent = 'Заклад'
    }
    const redemption = createCell('redemption', 'Buyout', `$ ${classGame(target).redemptionPrice}`)
    if(currentLanguage === 'RU'){
        redemption.firstChild.textContent = 'Выкуп'
    }else if(currentLanguage === 'BEL'){
        redemption.firstChild.textContent = 'Выкуп'
    }
    const houseSale = createCell('house-sale', 'House sale', `$ ${classGame(target).houseCost * 0.8}`)
    if(currentLanguage === 'RU'){
        houseSale.firstChild.textContent = 'Продажа дома'
    }else if(currentLanguage === 'BEL'){
        houseSale.firstChild.textContent = 'Продажа дома'
    }
    const hotelSale = createCell('hotel-sale', 'Hotel sale', `$ ${classGame(target).houseCost * 0.8}`)
    if(currentLanguage === 'RU'){
        hotelSale.firstChild.textContent = 'Продажа отеля'
    }else if(currentLanguage === 'BEL'){
        hotelSale.firstChild.textContent = 'Продажа гасцініцы'
    }

    appendElementTo(document.body, tooltipElem)
    appendElementTo(tooltipElem, wrapperCard)
    appendElementTo(wrapperCard, wrapperColor)
    appendElementTo(wrapperColor, wrapperColorName)
    appendElementTo(wrapperCard, infoRents)
    appendElementTo(infoRents, rent, rentWithColorSet, rentWithOne, rentWithTwo, rentWithThree, rentWithFour, rentWithFive)
    appendElementTo(wrapperCard, housest)
    appendElementTo(housest, housestCost, hotelsCost, pledge, redemption, houseSale, hotelSale)

    addWindow(target, tooltipElem)
    addStuleBaground(tooltipElem, '#C6CACC')
}

function classGame(target: HTMLInputElement) {
    let property: any;
    for (let i = 0; i < game.cells.length; i += 1) {
        const cell = game.cells[i];
        if (cell.position === Number(target.id)) {
            property = cell;
            break;
        }
    }
    return property
}


export function cardRailroad(event: Event, tooltipElem: HTMLElement) {
    const target = <HTMLInputElement>event.target;
    const currentLanguage: string = localStorage.getItem('language')
    tooltipElem = createElement('div', ['card-tax', 'tooltips'])
    const image: HTMLImageElement = createElement('img', ['image'])
    image.src = target.children[0].attributes[0].value

    const nameRailroad = createElement('div', ['name-railroad'], `${(<HTMLElement>target.children[1]).textContent}`)
    const rentalInstruction = createElement('div', ['rental-instruction'])

    const rent = createCell('rent', 'Rent', '$25') 
    if(currentLanguage === 'RU'){
        rent.firstChild.textContent = 'Аренда'
    }else if(currentLanguage === 'BEL'){
        rent.firstChild.textContent = 'Арэнда'
    }
    
    const owner = createElement('div', ['owner'])
    const ownerTwo = createCell('owner-two', 'If 2 owned', '$50')
    if(currentLanguage === 'RU'){
        ownerTwo.firstChild.textContent = 'Если 2 принадлежат'
    }else if(currentLanguage === 'BEL'){
        ownerTwo.firstChild.textContent = 'Калі 2 належаць'
    }
    const ownerThree = createCell('owner-three', 'If 3 owned', '$100')
    if(currentLanguage === 'RU'){
        ownerThree.firstChild.textContent = 'Если 3 принадлежат'
    }else if(currentLanguage === 'BEL'){
        ownerThree.firstChild.textContent = 'Калі 3 належаць'
    }
    const ownerFour = createCell('owner-four', 'If 4 owned', '$200')
    if(currentLanguage === 'RU'){
        ownerFour.firstChild.textContent = 'Если 4 принадлежат'
    }else if(currentLanguage === 'BEL'){
        ownerFour.firstChild.textContent = 'Калі 4 належаць'
    }

    const pledge = createCell('pledge', 'Pledge', `$ ${classGame(target).pledgePrice}`) 
    if(currentLanguage === 'RU'){
        pledge.firstChild.textContent = 'Залог'
    }else if(currentLanguage === 'BEL'){
        pledge.firstChild.textContent = 'Заклад'
    }
    const redemption = createCell('redemption', 'Buyout', `$ ${classGame(target).redemptionPrice}`)
    if(currentLanguage === 'RU'){
        redemption.firstChild.textContent = 'Выкуп'
    }else if(currentLanguage === 'BEL'){
        redemption.firstChild.textContent = 'Выкуп'
    }

    appendElementTo(document.body, tooltipElem)
    appendElementTo(tooltipElem, image)
    appendElementTo(tooltipElem, nameRailroad)
    appendElementTo(tooltipElem, rentalInstruction)
    appendElementTo(rentalInstruction, rent, owner, ownerTwo, ownerThree, ownerFour, pledge, redemption)

    addWindow(target, tooltipElem)
    addStuleBaground(tooltipElem, '#DEB887', '#fffce2')
}

export function cardCompany(event: any, tooltipElem: HTMLElement) {
    const target = event.target;
    const currentLanguage: string = localStorage.getItem('language')
    tooltipElem = createElement('div', ['company', 'tooltips'])
    const image = createElement('img', ['image'])
    image.src = target.children[0].attributes[0].value

    const nameCompany = createElement('div', ['name-company'], `${target.children[1].textContent}`)

    const pledge = createCell('pledgeCompany', 'Pledge', `$ ${classGame(target).pledgePrice}`)
    if(currentLanguage === 'RU'){
        pledge.firstChild.textContent = 'Залог'
    }else if(currentLanguage === 'BEL'){
        pledge.firstChild.textContent = 'Заклад'
    }
    const redemption = createCell('redemptionCompany', 'Buyout', `$ ${classGame(target).redemptionPrice}`)
    if(currentLanguage === 'RU'){
        redemption.firstChild.textContent = 'Выкуп'
    }else if(currentLanguage === 'BEL'){
        redemption.firstChild.textContent = 'Выкуп'
    }

    const companyInstructionOne = createElement('div', ['company-instruction-one'], 'If the player has one business, then the rent is four times the result of the die roll.')
    if(currentLanguage === 'RU'){
        companyInstructionOne.textContent = 'Если у игрока один бизнес, то арендная плата в четыре раза больше результата броска кубика.'
    }else if(currentLanguage === 'BEL'){
        companyInstructionOne.textContent = 'Калі ў гульца адзін бізнэс, то арэндная плата ў чатыры разы перавышае вынік кідка кубіка.'
    }

    const companyInstructionTwo = createElement('div', ['company-instruction-two'], 'If the player owns both businesses, the rent is ten times the result of the die roll.')
    if(currentLanguage === 'RU'){
        companyInstructionTwo.textContent = 'Если игрок владеет обоими предприятиями, арендная плата в десять раз превышает результат броска кубика.'
    }else if(currentLanguage === 'BEL'){
        companyInstructionTwo.textContent = 'Калі гулец валодае абодвума прадпрыемствамі, арэндная плата ў дзесяць разоў перавышае вынік кідка кубіка.'
    }

    appendElementTo(document.body, tooltipElem)
    appendElementTo(tooltipElem, image, nameCompany, pledge, redemption, companyInstructionOne, companyInstructionTwo)
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