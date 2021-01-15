import Cell from '../Cell/Cell';

export default class Communal extends Cell {
  constructor(type, name, position, cost) {
    super(type, name, position);
    this.cost = cost;
  }

  get rent() {
    return this._rent;
  }
}