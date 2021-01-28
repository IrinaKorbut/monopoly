import Game from '../Game/Game';

export function isGameFinish(): boolean {
  return Game.players.length === 1;
}

export function end(): void {
  alert(`Player ${Game.activePlayer.name} won!`);
}