import { createElement } from '../helpFunctions/helpFunctions';
import { appendElementTo } from '../helpFunctions/helpFunctions';
import Game from '../Game/Game'


function createCard(player, playerCardsField) {
  const playerCard = createElement('div', ['player-card']);
  appendElementTo(playerCardsField, playerCard);

  appendElementTo(playerCard, createElement('div', ['player-card__name'], player.name));

  const playerCardCash = createElement('div', ['player-card__cash']);
  appendElementTo(playerCardCash, createElement('div', ['player-card__cash__money'], player.money), createElement('div', ['player-card__cash__currency'], '$'));
  appendElementTo(playerCard, playerCardCash);

  const playerCardColor = createElement('div', ['player-card__color']);
  playerCardColor.style.background = player.color;
  appendElementTo(playerCard, playerCardColor);
  player.playerCard = playerCard;
}

export default function renderPlayerCard() {
  const playerCardsField = document.querySelector('.players-cards');
  Game.players.forEach((element) => {
    createCard(element, playerCardsField);
  });
}