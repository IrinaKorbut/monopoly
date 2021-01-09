import Cell from '../Cell/Cell';

export default class Communal extends Cell {
  constructor(type, name, position) {
    super(type, name, position);
  }

  get rent() {
    return this._rent;
  }
}