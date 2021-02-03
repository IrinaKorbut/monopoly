import Game from '../entities/Game/Game';
import { showWinScreen } from '../popupWindows/winScreen/winScreen';

export function isGameFinish(): boolean {
  return Game.players.length === 1;
}

export function end(): void {
  showWinScreen();
}
