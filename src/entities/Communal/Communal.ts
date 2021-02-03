import Cell from '../Cell/Cell';
import Property from '../ifacies/Property';
import Player from '../Player/Player';

export default class Communal extends Cell implements Property {
  readonly cost: number;

  readonly kitSize: number;

  readonly kitId: number;

  readonly pledgePrice: number = 75;

  readonly redemptionPrice: number = 83;

  isPredge: boolean = false;

  owner: Player;

  constructor(type: string, name: string, russianName: string, belarusianName: string,
    position: number, cost: number, kitSize: number, kitId: number) {
    super(type, name, russianName, belarusianName, position);
    this.cost = cost;
    this.kitSize = kitSize;
    this.kitId = kitId;
  }
}
