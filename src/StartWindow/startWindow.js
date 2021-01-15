import { createElement, appendElementTo } from '../helpFunctions/helpFunctions'

export function startWindow() {
    const classStartWindow = document.querySelector('.start-window')
    const numberPlayers = createElement('div', ['number-players'], 'Select number of players.')
    const gamekoi = createElement('select', ['select-style'])
    const gamekoiDisabl = createElement('option', ['num'], 'num')
    gamekoiDisabl.selected = 'selected'
    gamekoiDisabl.disabled = 'disabled'

    const gamekoiTuo = createElement('option', ['num'], '2')
    gamekoiTuo.value = 2

    const gamekoiThree = createElement('option', ['num'], '3')
    gamekoiThree.value = 3

    const gamekoiFour = createElement('option', ['num'], '4')
    gamekoiFour.value = 4

    const settingGamers = createElement('div', ['setting-gamers'])
    const btnStart = createElement('button', ['btn-start', 'color-btn'], 'Start game')

    appendElementTo(classStartWindow, numberPlayers)
    appendElementTo(numberPlayers, gamekoi)
    appendElementTo(gamekoi, gamekoiDisabl, gamekoiTuo, gamekoiThree, gamekoiFour)
    appendElementTo(classStartWindow, settingGamers)
    appendElementTo(classStartWindow, btnStart)

}
