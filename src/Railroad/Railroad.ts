import Cell from '../Cell/Cell';

export default class Railroad extends Cell {
  readonly cost: number = 200;
  readonly oneRailroadRent: number = 25;
  readonly twoRailroadRent: number = 50;
  readonly threeRailroadRent: number = 100;
  readonly fourRailroadRent: number = 200;
  private rent: number;

  constructor(type: string, name: string, position: number) {
    super(type, name, position);
  }

  get currentRent() {
    return this.rent;
  }

  set currentRent(reilroadQantity: number) {
    switch (reilroadQantity) {
      case 1:
        this.rent = this.oneRailroadRent;
        break;
      case 2:
        this.rent = this.twoRailroadRent;
        break;
      case 3:
        this.rent = this.threeRailroadRent;
        break;
      case 4:
        this.rent = this.fourRailroadRent;
        break;
      default:
        this.rent = 0;
    }
  }
}