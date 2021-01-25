import Game from '../Game/Game';
import { createElement, removeChildsFromElement, appendElementTo } from '../helpFunctions/helpFunctions';

export default function playerLose(player) {
  player.property.forEach((property) => {
    property.owner = null;
    const propertyViewCost = property.element.querySelector('.cost');
    const ownerColor = property.element.querySelector('.owner');
    ownerColor.style.backgroundColor = '#c0c0c0';
    player.chip.remove();
    propertyViewCost.innerText = `$${property.cost}`;
  });
  const loserIndex = Game.players.indexOf(player);
  Game.players.splice(loserIndex, 1);
  removeChildsFromElement(player.playerCard);
  const loseImg = createElement('img');
  loseImg.setAttribute('src', './images/dead.svg');
  appendElementTo(player.playerCard, createElement('div', ['player-card__name'], player.name), loseImg);
}
