import Cell from '../Cell/Cell';

export default class Communal extends Cell {
  readonly cost: number;
  readonly kitSize: number;
  readonly kitId: number;

  constructor(type: string, name: string, position: number, cost: number, kitSize: number, kitId: number) {
    super(type, name, position);
    this.cost = cost;
    this.kitSize = kitSize;
    this.kitId = kitId;
  }
}