import Cell from '../Cell/Cell';

export default class Tax extends Cell {
  readonly cost: number;
  
  constructor(type: string, name: string, position: number, cost: number) {
    super(type, name, position);
    this.cost = cost;
  }
}