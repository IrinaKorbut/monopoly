import movePlayer from './move_player/movePlayerFn';
import { diceInitTest } from './dice/dice';

import './style/style.scss';
import './style/cell.scss';
import './style/dice.scss';

diceInitTest();
movePlayer(25);
