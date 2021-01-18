import Cell from '../Cell/Cell';

export default class Railroad extends Cell {
  constructor(type, name, position) {
    super(type, name, position);
    this.cost = 200;
    this.oneReilroadRent = 25;
    this.twoRailroadRent = 50;
    this.threeRailroadRent = 100;
    this.fourRailroadRent = 200;
  }

  get currentRent() {
    return this._rent;
  }

  set currentRent(reilroadQantity) {
    switch (reilroadQantity) {
      case 1:
        this._rent = this.oneReilroadRent;
        break;
      case 2:
        this._rent = this.twoRailroadRent;
        break;
      case 3:
        this._rent = this.threeRailroadRent;
        break;
      case 4:
        this._rent = this.fourRailroadRent;
        break;
      default:
        this._rent = 0;
    }
  }

  get owner() {
    return this._owner;
  }

  set owner(owner) {
    this._owner = owner;
  }
}
