import Game from '../Game/Game';
import { createElement, removeChildsFromElement, appendElementTo } from '../helpFunctions/helpFunctions';
import Property from '../ifacies/Property';
import Player from '../Player/Player';

export default function playerLose(player: Player): void {
  player.property.forEach((property: Property) => {
    property.owner = null;
    if (property.type === 'street') {
      property.isAvailableToBuyHouse = false;
      property.numberOfHouses = 0;
      property.isThereHotel = false;
      removeChildsFromElement(property.element.querySelector('.street-color'));
    }
    const propertyViewCost: HTMLElement = property.element.querySelector('.cost');
    const ownerColor: HTMLElement = property.element.querySelector('.owner');
    ownerColor.style.backgroundColor = '';
    player.chip.remove();
    propertyViewCost.innerText = `$${property.cost}`;
  });
  const loserIndex = Game.players.indexOf(player);
  Game.players.splice(loserIndex, 1);
  removeChildsFromElement(player.playerCard);
  const loseImg: HTMLElement = createElement('img');
  loseImg.setAttribute('src', './images/dead.svg');
  appendElementTo(player.playerCard, createElement('div', ['player-card__name'], player.name), loseImg);
}
