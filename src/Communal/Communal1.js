import Cell from '../Cell/Cell';

export default class Communal extends Cell {
  constructor(type, name, position, cost, kitSize, kitId) {
    super(type, name, position);
    this.cost = cost;
    this.kitSize = kitSize;
    this.kitId = kitId;
  }

  get rent() {
    return this._rent;
  }
}