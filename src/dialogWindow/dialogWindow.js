import { createElement, appendElementTo, removeChildsFromElement } from '../helpFunctions/helpFunctions';
import { roll } from '../dice/dice';
import movePlayer from '../move_player/movePlayerFn';
import game from '../Game/Game';

export default function showDialogWindow(action) {
  console.log(game.activePlayer);
  let title;
  const dialogWindowSection = document.querySelector('.dialog-window');
  removeChildsFromElement(dialogWindowSection);
  switch (action) {
    case 'wait':
      const img = createElement('img');
      img.setAttribute('src', './images/time.svg');
      appendElementTo(dialogWindowSection, img);
      break;
    case 'roll':
      title = createElement('p', ['title'], `${game.activePlayer.name} move`);
      const rollButton = createElement('div', ['button'], 'Roll Dice');
      rollButton.addEventListener('click', () => {
        showDialogWindow('wait');
        const p = new Promise((resolve) => {
          let test;
          setTimeout(() => {
            test = setInterval(roll, 200);
          }, 0);
          setTimeout(() => {
            clearInterval(test);
            resolve();
          }, 3000);
        });
        p.then(() => {
          movePlayer(roll());
        });
      });
      appendElementTo(dialogWindowSection, title, rollButton);
      break;
    case 'buy':
      title = createElement('p', ['title'], 'Buy?');
      const buttonsWrapper = createElement('div', ['buttons-wrapper']);
      const buttonYes = createElement('div', ['button', 'yes'], 'Yes');
      buttonYes.addEventListener('click', () => {
        let property = getCellObjByPosition(game.activePlayer.position);
        addPropertyToPlayer(game.activePlayer, property);
        const ownerLine = property.element.querySelector('.owner');
        ownerLine.style.backgroundColor = game.activePlayer.color;
        showDialogWindow('roll');
      });
      const buttonNo = createElement('div', ['button', 'no'], 'No');
      buttonNo.addEventListener('click', () => {
        showDialogWindow('roll');
      });
      appendElementTo(buttonsWrapper, buttonYes, buttonNo);
      appendElementTo(dialogWindowSection, title, buttonsWrapper);
      break;
    case 'rent':
      title = createElement('p', ['title'], 'The rent is $1000');
      const payRentButton = createElement('div', ['button'], 'Pay');
      payRentButton.addEventListener('click', () => {
        // do some magic
      });
      appendElementTo(dialogWindowSection, title, payRentButton);
      break;
    case 'tax':
      const cell = getCellObjByPosition(game.activePlayer.position);
      title = createElement('p', ['title'], `${cell.name} $${cell.cost}`);
      const payTaxButton = createElement('div', ['button'], 'Pay');
      payTaxButton.addEventListener('click', () => {
        game.activePlayer.subtractMoney(cell.cost);
        showDialogWindow('roll');
      });
      appendElementTo(dialogWindowSection, title, payTaxButton);
      break;
    default:
      console.log();
  }
}

function addPropertyToPlayer(player, property) {
  player.addProperty(property);
  player.subtractMoney(property.cost);
  property.owner = game.activePlayer;
}

function getCellObjByPosition(position) {
  for (let i = 0; i < game.cells.length; i += 1) {
    const cell = game.cells[i];
    if (cell.position === position) {
      return cell;
    }
  }
}
