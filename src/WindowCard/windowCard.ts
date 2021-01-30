import { createCell, addWindow, addSelectorClass } from './windowCardConst';
import { createElement, appendElementTo } from '../helpFunctions/helpFunctions'
import game from '../Game/Game';

import './windowCard.scss';

function addStuleBaground(nameCompany: HTMLElement, colorCard: string, colorCardWil?: string) {
    const classStyleDarc = document.querySelector('.dark-style')
    nameCompany.style.background = classStyleDarc ? `${colorCard}` : `${colorCardWil}`|| '#fff'
}

export function cardStreet(event: Event, tooltipElem: HTMLElement) {
    const target = <HTMLInputElement>event.target;
    const currentLanguage: string = localStorage.getItem('language')
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
    const wrapperColorName = createElement('div', ['wrapper-color-name'], (<HTMLElement>target.children[1]).innerText)

    const infoRents = createElement('div', ['info-rents'])
    const rent = createCell('rent', 'Rent', `$ ${property.rent}`)
    if(currentLanguage === 'RU'){
        rent.firstChild.innerText = 'Аренда'
    }else if(currentLanguage === 'BEL'){
        rent.firstChild.innerText = 'Арэнда'
    }

    const rentWithColorSet = createCell('rent-with-color-set', 'Rent with color set', `$ ${property.rent * 2}`)
    if(currentLanguage === 'RU'){
        rentWithColorSet.firstChild.innerText = 'С набором цветов'
    }else if(currentLanguage === 'BEL'){
        rentWithColorSet.firstChild.innerText = 'З каляровым наборам'
    }

    const rentWithOne = createCell('rent-with-one', 'with 1 hause', `$ ${property.rentWithOneHouse}`)
    if(currentLanguage === 'RU'){
        rentWithOne.firstChild.innerText = 'С 1 домом'
    }else if(currentLanguage === 'BEL'){
        rentWithOne.firstChild.innerText = 'З 1 будынкам'
    }
    const rentWithTwo = createCell('rent-with-two', 'with 2 hauses', `$ ${property.rentWhithTwoHouses}`)
    if(currentLanguage === 'RU'){
        rentWithTwo.firstChild.innerText = 'С 2 домом'
    }else if(currentLanguage === 'BEL'){
        rentWithTwo.firstChild.innerText = 'З 2 будынкам'
    }
    const rentWithThree = createCell('rent-with-three', 'with 3 hauses', `$ ${property.rentWithTreeHouses}`)
    if(currentLanguage === 'RU'){
        rentWithThree.firstChild.innerText = 'С 3 домом'
    }else if(currentLanguage === 'BEL'){
        rentWithThree.firstChild.innerText = 'З 3 будынкам'
    }
    const rentWithFour = createCell('rent-with-four', 'with 4 hauses', `$ ${property.rentWhithFourHouses}`)
    if(currentLanguage === 'RU'){
        rentWithFour.firstChild.innerText = 'С 4 домом'
    }else if(currentLanguage === 'BEL'){
        rentWithFour.firstChild.innerText = 'З 4 будынкам'
    }
    const rentWithFive = createCell('rent-with-five', 'with HOTEL', `$ ${property.rentWhithHotel}`)
    if(currentLanguage === 'RU'){
        rentWithFive.firstChild.innerText = 'С отелем'
    }else if(currentLanguage === 'BEL'){
        rentWithFive.firstChild.innerText = 'З гатэлем'
    }
    const housest = createElement('div', ['housest'])
    const housestCost = createCell('housest-cost', 'Housest cost', `$ ${property.houseCost}`)
    if(currentLanguage === 'RU'){
        housestCost.firstChild.innerText = 'Стоимость дома'
    }else if(currentLanguage === 'BEL'){
        housestCost.firstChild.innerText = 'Кошт дома'
    }
    const hotelsCost = createCell('hotels-cost', 'Hotels cost', `$ ${property.houseCost}`)
    if(currentLanguage === 'RU'){
        hotelsCost.firstChild.innerText = 'Стоимость отеля'
    }else if(currentLanguage === 'BEL'){
        hotelsCost.firstChild.innerText = 'Гасцініца каштуе'
    }

    const pledge = createCell('pledge', 'Pledge', `$ ${property.pledgePrice}`)
    if(currentLanguage === 'RU'){
        pledge.firstChild.innerText = 'Залог'
    }else if(currentLanguage === 'BEL'){
        pledge.firstChild.innerText = 'Заклад'
    }
    const redemption = createCell('redemption', 'Buyout', `$ ${property.redemptionPrice}`)
    if(currentLanguage === 'RU'){
        redemption.firstChild.innerText = 'Выкуп'
    }else if(currentLanguage === 'BEL'){
        redemption.firstChild.innerText = 'Выкуп'
    }
    const houseSale = createCell('house-sale', 'House sale', `$ ${property.houseCost * 0.8}`)
    if(currentLanguage === 'RU'){
        houseSale.firstChild.innerText = 'Продажа дома'
    }else if(currentLanguage === 'BEL'){
        houseSale.firstChild.innerText = 'Продажа дома'
    }
    const hotelSale = createCell('hotel-sale', 'Hotel sale', `$ ${property.houseCost * 0.8}`)
    if(currentLanguage === 'RU'){
        hotelSale.firstChild.innerText = 'Продажа отеля'
    }else if(currentLanguage === 'BEL'){
        hotelSale.firstChild.innerText = 'Продажа гасцініцы'
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

export function cardRailroad(event: Event, tooltipElem: HTMLElement) {
    const target = <HTMLInputElement>event.target;
    const currentLanguage: string = localStorage.getItem('language')
    tooltipElem = createElement('div', ['card-tax', 'tooltips'])
    const image: HTMLImageElement = createElement('img', ['image'])
    image.src = target.children[0].attributes[0].value

    const nameRailroad = createElement('div', ['name-railroad'], `${(<HTMLElement>target.children[1]).innerText}`)
    const rentalInstruction = createElement('div', ['rental-instruction'])

    const rent = createCell('rent', 'Rent', '$25') 
    if(currentLanguage === 'RU'){
        rent.firstChild.innerText = 'Аренда'
    }else if(currentLanguage === 'BEL'){
        rent.firstChild.innerText = 'Арэнда'
    }
    
    const owner = createElement('div', ['owner'])
    const ownerTwo = createCell('owner-two', 'If 2 owned', '$50')
    if(currentLanguage === 'RU'){
        ownerTwo.firstChild.innerText = 'Если 2 принадлежат'
    }else if(currentLanguage === 'BEL'){
        ownerTwo.firstChild.innerText = 'Калі 2 належаць'
    }
    const ownerThree = createCell('owner-three', 'If 3 owned', '$100')
    if(currentLanguage === 'RU'){
        ownerThree.firstChild.innerText = 'Если 3 принадлежат'
    }else if(currentLanguage === 'BEL'){
        ownerThree.firstChild.innerText = 'Калі 3 належаць'
    }
    const ownerFour = createCell('owner-four', 'If 4 owned', '$200')
    if(currentLanguage === 'RU'){
        ownerFour.firstChild.innerText = 'Если 4 принадлежат'
    }else if(currentLanguage === 'BEL'){
        ownerFour.firstChild.innerText = 'Калі 4 належаць'
    }

    appendElementTo(document.body, tooltipElem)
    appendElementTo(tooltipElem, image)
    appendElementTo(tooltipElem, nameRailroad)
    appendElementTo(tooltipElem, rentalInstruction)
    appendElementTo(rentalInstruction, rent, owner, ownerTwo, ownerThree, ownerFour)

    addWindow(target, tooltipElem)
    addStuleBaground(tooltipElem, '#DEB887', '#fffce2')
}

export function cardCompany(event: any, tooltipElem: HTMLElement) {
    const target = event.target;
    const currentLanguage: string = localStorage.getItem('language')
    tooltipElem = createElement('div', ['company', 'tooltips'])
    const image = createElement('img', ['image'])
    image.src = target.children[0].attributes[0].value

    const nameCompany = createElement('div', ['name-company'], `${target.children[1].innerText}`)
    const companyInstructionOne = createElement('div', ['company-instruction-one'], 'If the player has one business, then the rent is four times the result of the die roll.')
    if(currentLanguage === 'RU'){
        companyInstructionOne.innerText = 'Если у игрока один бизнес, то арендная плата в четыре раза больше результата броска кубика.'
    }else if(currentLanguage === 'BEL'){
        companyInstructionOne.innerText = 'Калі ў гульца адзін бізнэс, то арэндная плата ў чатыры разы перавышае вынік кідка кубіка.'
    }

    const companyInstructionTwo = createElement('div', ['company-instruction-two'], 'If the player owns both businesses, the rent is ten times the result of the die roll.')
    if(currentLanguage === 'RU'){
        companyInstructionTwo.innerText = 'Если игрок владеет обоими предприятиями, арендная плата в десять раз превышает результат броска кубика.'
    }else if(currentLanguage === 'BEL'){
        companyInstructionTwo.innerText = 'Калі гулец валодае абодвума прадпрыемствамі, арэндная плата ў дзесяць разоў перавышае вынік кідка кубіка.'
    }

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