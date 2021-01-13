import { createElement, appendElementTo } from '../helpFunctions/helpFunctions';
import { roll } from '../dice/dice';
import movePlayer from '../move_player/movePlayerFn';

export default function showDialogWindow(game, action) {
  let title;
  let dialogWindowSection;
  switch (action) {
    case 'roll':
      title = createElement('p', ['title'], 'Player 1 move');
      const rollButton = createElement('div', ['button'], 'Roll Dice');
      rollButton.addEventListener('click', () => {
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
      dialogWindowSection = document.querySelector('.dialog-window');
      appendElementTo(dialogWindowSection, title, rollButton);
      break;
    case 'buy':
      title = createElement('p', ['title'], 'Buy?');
      const buttonsWrapper = createElement('div', ['buttons-wrapper']);
      const buttonYes = createElement('div', ['button', 'yes'], 'Yes');
      buttonYes.addEventListener('click', () => {
        let property = getCellObjByPosition(game, game.activePlayer.position);
        addPropertyToPlayer(game.activePlayer, property);
        const ownerLine = property.element.querySelector('.owner');
        ownerLine.style.backgroundColor = game.activePlayer.color;
      });
      const buttonNo = createElement('div', ['button', 'no'], 'No');
      buttonNo.addEventListener('click', () => {
        console.log();
      });
      dialogWindowSection = document.querySelector('.dialog-window');
      appendElementTo(buttonsWrapper, buttonYes, buttonNo);
      appendElementTo(dialogWindowSection, title, buttonsWrapper);
      break;
    case 'rent':
      title = createElement('p', ['title'], 'The rent is $1000');
      const payRentButton = createElement('div', ['button'], 'Pay');
      payRentButton.addEventListener('click', () => {
        // do some magic
      });
      dialogWindowSection = document.querySelector('.dialog-window');
      appendElementTo(dialogWindowSection, title, payRentButton);
      break;
      case 'tax':
        title = createElement('p', ['title'], 'Some tax $200');
        const payTaxButton = createElement('div', ['button'], 'Pay');
        payTaxButton.addEventListener('click', () => {
          // do some magic
        });
        dialogWindowSection = document.querySelector('.dialog-window');
        appendElementTo(dialogWindowSection, title, payTaxButton);
        break;
    default:
      console.log();
  }
}

function addPropertyToPlayer(player, property) {
  player.addProperty(property);
  property.owner = game.activePlayer;
}

function getCellObjByPosition(game, position) {
  for (let i = 0; i < game.cells.length; i += 1) {
    const cell = game.cells[i];
    if (cell.position === position) {
      return cell;
    }
  }
}
