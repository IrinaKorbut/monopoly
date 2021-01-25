import Cell from '../Cell/Cell';
import Property from '../ifacies/Property';
import Player from '../Player/Player';

export default class Communal extends Cell implements Property {
  readonly cost: number;
  readonly kitSize: number;
  readonly kitId: number;
  owner: Player;

  constructor(type: string, name: string, position: number, cost: number, kitSize: number, kitId: number) {
    super(type, name, position);
    this.cost = cost;
    this.kitSize = kitSize;
    this.kitId = kitId;
  }
}