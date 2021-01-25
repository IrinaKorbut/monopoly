import Cell from "../Cell/Cell";

export default class Player {
  readonly color: string;
  readonly name: string;
  readonly isHuman: boolean;
  position: number = 0;
  money: number = 15000;
  property: Array<Cell> = [];

  constructor(color: string, name: string, isHuman: boolean) {
    this.color = color;
    this.name = name;
    this.isHuman = isHuman;
  }

  addMoney(quantity: number) {
    this.money += quantity;
  }

  subtractMoney(quantity: number) {
    if (quantity <= this.money) {
      this.money -= quantity;
      return true;
    }
    return false;
  }

  addProperty(property: Cell) {
    this.property.push(property);
  }
}