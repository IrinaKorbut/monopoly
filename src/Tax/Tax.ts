import Cell from '../Cell/Cell';

export default class Tax extends Cell {
  readonly cost: number;
  
  constructor(type: string, name: string, russianName: string, belarusianName: string, position: number, cost: number) {
    super(type, name,  russianName, belarusianName, position);
    this.cost = cost;
  }
}