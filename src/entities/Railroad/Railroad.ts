import Cell from '../Cell/Cell';
import Property from '../ifacies/Property';
import Player from '../Player/Player';

export default class Railroad extends Cell implements Property {
  readonly cost: number = 200;

  readonly oneRailroadRent: number = 25;

  readonly twoRailroadRent: number = 50;

  readonly threeRailroadRent: number = 100;

  readonly fourRailroadRent: number = 200;

  readonly pledgePrice: number = 100;

  readonly redemptionPrice: number = 110;

  isPredge: boolean = false;

  rent: number;

  owner: Player;

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
