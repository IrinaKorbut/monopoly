

import { newPlayFn } from '../menu/menu'

import { createElement, appendElementTo } from '../helpFunctions/helpFunctions'

export function gameСompletion() {
    const currentLanguage: string = localStorage.getItem('language')
    const completion = document.querySelector('.game-completion')
    completion.innerHTML = '';
    const congratulations = createElement('div', ['congratulations'], 'Congratulations')
    const namePlayer = createElement('div', ['name-player'], 'Name Player')
    const newPlay = createElement('div', ['new-play'], 'New game')

    // if (currentLanguage === 'RU') {
    //     newPlay.textContent = 'Новая игра'
    // } else if (currentLanguage === 'BEL') {
    //     newPlay.textContent = 'Новая гульня'
    // }

    appendElementTo(completion, congratulations, namePlayer, newPlay)

    completion.classList.toggle('completion');
    document.querySelector('#blackout').classList.toggle('blackout');
    completion.classList.toggle('no-window');

    newPlay.addEventListener('click', newPlayFn)
}