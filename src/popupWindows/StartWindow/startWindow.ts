import { createElement, appendElementTo } from '../../helpFunctions/helpFunctions';
import Game from '../../entities/Game/Game';
import Player from '../../entities/Player/Player';
import renderPlayerCard from '../../gameSections/playerCards/renderPlayerCard';
import showDialogWindow from '../../gameSections/dialogWindow/dialogWindow';
import addPlayerToField from '../../addPlayerToField/addPlayerToField';
import computerMove from '../../computerRival/computerRival';
import initBuyHouseButton from '../../gameSections/propertyActions/buyHouse/buyHouse'
import { btnClikMenu } from '../menu/menu';
import initPledgeBtn from '../../gameSections/propertyActions/pledge/pledge';
import initBuyoutBtn from '../../gameSections/propertyActions/buyout/buyout';

export function startWindow() {
  const classStartWindow = document.querySelector('.start-window');
  classStartWindow.innerHTML = ''

  const currentLanguage: string = localStorage.getItem('language')

  const numberPlayers = createElement('div', ['number-players'], 'Select number of players:');
  if (currentLanguage === 'RU') {
    numberPlayers.textContent = 'Выберите количество игроков:'
  } else if (currentLanguage === 'BEL') {
    numberPlayers.textContent = 'Выберыце колькасць гульцоў:'
  }
  const gamekoi = createElement('select', ['select-style']);
  const gamekoiDisabl = createElement('option', ['num'], 'num');
  if (currentLanguage === 'RU') {
    gamekoiDisabl.textContent = 'кол.'
  } else if (currentLanguage === 'BEL') {
    gamekoiDisabl.textContent = 'кол.'
  }
  gamekoiDisabl.selected = 'selected';
  gamekoiDisabl.disabled = 'disabled';

  const gamekoiTuo = createElement('option', ['num'], '2');
  gamekoiTuo.value = 2;

  const gamekoiThree = createElement('option', ['num'], '3');
  gamekoiThree.value = 3;

  const gamekoiFour = createElement('option', ['num'], '4');
  gamekoiFour.value = 4;

  const settingGamers = createElement('div', ['setting-gamers']);
  const btnStart = createElement('button', ['btn-start', 'color-btn'], 'Start game');
  if (currentLanguage === 'RU') {
    btnStart.textContent = 'Начать игру'
  } else if (currentLanguage === 'BEL') {
    btnStart.textContent = 'Пачаць гульню'
  }

  appendElementTo(classStartWindow, numberPlayers);
  appendElementTo(numberPlayers, gamekoi);
  appendElementTo(gamekoi, gamekoiDisabl, gamekoiTuo, gamekoiThree, gamekoiFour);
  appendElementTo(classStartWindow, settingGamers);
  appendElementTo(classStartWindow, btnStart);

  gamekoi.addEventListener('change', () => addGamecoaSetting(settingGamers, gamekoi.value));
  startBtn();
}

export function startBtn() {
  const startBtn = document.querySelector('.btn-start');
  startBtn.addEventListener('click', () => {
    let name: any = 0;
    let sumClass = false;

    const inputName: NodeListOf<HTMLSelectElement> = document.querySelectorAll('.input-name');
    inputName.forEach((e) => name += !e.value);

    const selectStyle: NodeListOf<HTMLSelectElement> = document.querySelectorAll('.select-game');
    selectStyle.forEach((e) => sumClass = e.value !== 'Color' && e.value !== 'Цвет' && e.value !== 'Колер');

    const isHumanSelect: NodeListOf<HTMLSelectElement> = document.querySelectorAll('.player-selectHuman');

    if (name === 0 && sumClass) {
      for (let i = 0; i < inputName.length; i++) {
        const isHuman = isHumanSelect[i].value === 'human';
        Game.addPlayer(new Player(selectStyle[i].value, inputName[i].value, isHuman));
      }
      Game.activePlayer = Game.players[0];
      if (Game.activePlayer.isHuman) {
        showDialogWindow('roll');
      } else {
        showDialogWindow('wait');
        const buttonBuyHouse = document.querySelector('.button__buy-house');
        buttonBuyHouse.classList.add('inactive');
        computerMove('roll');
      }

      renderPlayerCard();
      Game.activePlayer.playerCard.classList.add('backlight');
      addPlayerToField();
      
      document.querySelector('.start-window').classList.add('no-active');
      document.querySelector('#blackout').classList.remove('blackout');

      // btnClikMenu()

    } else {
      startBtn.classList.remove('color-btn');
      startBtn.classList.add('color-warning-btn');
    }
    // renderPlayerCard();
    // Game.activePlayer.playerCard.classList.add('backlight');
    // addPlayerToField();

  });
}

function addGamecoaSetting(settingGamers: HTMLElement, selectNum: number) {
  settingGamers.innerHTML = '';
  const currentLanguage: string = localStorage.getItem('language')

  for (let i = 0; i < selectNum; i++) {
    const playerWrapper = createElement('div', ['player-wrapper']);
    const playerIcon = createElement('div', [`player-icon${i + 1}`, 'icon']);
    const playerIconName = createElement('p', [`player-icon-name${i + 1}`, 'icon-name'], 'P');
    if(currentLanguage === 'EN'){
      playerIconName.textContent = 'P';
    } else if (currentLanguage === 'RU') {
      playerIconName.textContent = 'И'
    } else {
      playerIconName.textContent = 'Г'
    }
    const playerInput = createElement('input', [`player-input`, 'input-name']);
    playerInput.placeholder = 'Player';
    if (currentLanguage === 'RU') {
      playerInput.placeholder = 'Игрок'
    } else if (currentLanguage === 'BEL') {
      playerInput.placeholder = 'Гулец'
    }

    const playerSelectColor = createElement('select', [`player-select-color${i + 1}`, 'select-style', 'select-game']);
    const selectColorDisabl = createElement('option', ['disabled'], 'Color');
    if (currentLanguage === 'RU') {
      selectColorDisabl.textContent = 'Цвет'
    } else if (currentLanguage === 'BEL') {
      selectColorDisabl.textContent = 'Колер'
    }
    selectColorDisabl.selected = 'selected';
    selectColorDisabl.disabled = 'disabled';

    const selectColorUan = createElement('option', ['red', 'lang-red'], 'Red');
    if (currentLanguage === 'RU') {
      selectColorUan.textContent = 'Красный'
    } else if (currentLanguage === 'BEL') {
      selectColorUan.textContent = 'Чырвоны'
    }
    selectColorUan.value = '#db2428';

    const selectColorTuo = createElement('option', ['blue', 'lang-blue'], 'Blue');
    if (currentLanguage === 'RU') {
      selectColorTuo.textContent = 'Синий'
    } else if (currentLanguage === 'BEL') {
      selectColorTuo.textContent = 'Сіні'
    }
    selectColorTuo.value = '#47a7ff';

    const selectColorThree = createElement('option', ['orange', 'lang-orange'], 'Orange');
    if (currentLanguage === 'RU') {
      selectColorThree.textContent = 'Оранжевый'
    } else if (currentLanguage === 'BEL') {
      selectColorThree.textContent = 'Аранжавы'
    }
    selectColorThree.value = '#eb8b2c';

    const selectColorFour = createElement('option', ['green', 'lang-green'], 'Green');
    if (currentLanguage === 'RU') {
      selectColorFour.textContent = 'Зеленый'
    } else if (currentLanguage === 'BEL') {
      selectColorFour.textContent = 'Зялёны'
    }
    selectColorFour.value = '#11a85a';

    const playerSelectHuman = createElement('select', ['player-selectHuman', 'select-style']);
    const selectHuman = createElement('option', ['numHuman'], 'Human');
    if (currentLanguage === 'RU') {
      selectHuman.textContent = 'Человек'
    } else if (currentLanguage === 'BEL') {
      selectHuman.textContent = 'Чалавек'
    }
    selectHuman.value = 'human';

    const selectAi = createElement('option', ['numComputer'], 'Computer');
    if (currentLanguage === 'RU') {
      selectAi.textContent = 'Компьютер'
    } else if (currentLanguage === 'BEL') {
      selectAi.textContent = "Камп'ютар"
    }
    selectAi.value = 'ai';

    appendElementTo(settingGamers, playerWrapper);
    appendElementTo(playerWrapper, playerIcon, playerInput, playerSelectColor, playerSelectHuman);
    appendElementTo(playerIcon, playerIconName);
    appendElementTo(playerSelectColor, selectColorDisabl, selectColorUan, selectColorTuo, selectColorThree, selectColorFour);
    appendElementTo(playerSelectHuman, selectHuman, selectAi);

    playerSelectColor.addEventListener('change', () => playerIcon.style.backgroundColor = playerSelectColor.value);
    playerInput.addEventListener('input', () => addNameA(playerIconName, playerInput.value));
  }
}

function addNameA(playerIconName: HTMLElement, playerInput: any): void {
  const currentLanguage: string = localStorage.getItem('language')
  if (!playerInput[0]) {
    if(currentLanguage === 'EN'){
      playerIconName.textContent = 'P';
    } else if (currentLanguage === 'RU') {
      playerIconName.textContent = 'И'
    } else {
      playerIconName.textContent = 'Г'
    }
  } else {
    playerIconName.textContent = playerInput[0].toUpperCase();
  }
}
