import Cell from '../Cell/Cell';

export default class Tax extends Cell {
  constructor(type, name, position, cost) {
    super(type, name, position);
    this.cost = cost;
  }
}
