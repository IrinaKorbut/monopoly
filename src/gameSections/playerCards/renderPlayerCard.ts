import { createElement } from '../../helpFunctions/helpFunctions';
import { appendElementTo } from '../../helpFunctions/helpFunctions';
import Game from '../../entities/Game/Game'
import Player from '../../entities/Player/Player';

function createCard(player: Player, playerCardsField: HTMLElement): void {
  const playerCard: HTMLElement = createElement('div', ['player-card']);
  appendElementTo(playerCardsField, playerCard);

  appendElementTo(playerCard, createElement('div', ['player-card__name'], player.name));

  const playerCardCash: HTMLElement = createElement('div', ['player-card__cash']);
  appendElementTo(playerCardCash, createElement('div', ['player-card__cash__money'], player.money), createElement('div', ['player-card__cash__currency'], '$'));
  appendElementTo(playerCard, playerCardCash);

  const playerCardColor: HTMLElement = createElement('div', ['player-card__color']);
  playerCardColor.style.background = player.color;
  appendElementTo(playerCard, playerCardColor);
  player.playerCard = playerCard;
}

export default function renderPlayerCard(): void {
  const playerCardsField: HTMLElement = document.querySelector('.players-cards');
  Game.players.forEach((player: Player) => {
    createCard(player, playerCardsField);
  });
}