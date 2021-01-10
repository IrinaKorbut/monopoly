import movePlayer from './move_player/movePlayerFn';
import { diceInitTest } from './dice/dice';

import './style/style.scss';
import './style/dice.scss';
// import './style/cell.scss';

import './style/field.scss';

diceInitTest();
movePlayer(25);
