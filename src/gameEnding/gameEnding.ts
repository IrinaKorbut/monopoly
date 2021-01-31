import Game from '../Game/Game';
import { gameСompletion } from '../gameСompletion/gameСompletion';

export function isGameFinish(): boolean {
  return Game.players.length === 1;
}

export function end(): void {
  gameСompletion();
}