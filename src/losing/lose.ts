import Game from '../Game/Game';
import { createElement, removeChildsFromElement, appendElementTo } from '../helpFunctions/helpFunctions';
import Player from '../Player/Player';

export default function playerLose(player: Player): void {
  player.property.forEach((property) => {
    property.owner = null;
    const propertyViewCost: HTMLElement = property.element.querySelector('.cost');
    const ownerColor: HTMLElement = property.element.querySelector('.owner');
    ownerColor.style.backgroundColor = '#c0c0c0';
    player.chip = null;
    propertyViewCost.innerText = `$${property.cost}`;
  });
  const loserIndex = Game.players.indexOf(player);
  Game.players.splice(loserIndex, 1);
  removeChildsFromElement(player.playerCard);
  const loseImg: HTMLElement = createElement('img');
  loseImg.setAttribute('src', './images/dead.svg');
  appendElementTo(player.playerCard, createElement('div', ['player-card__name'], player.name), loseImg);
}
