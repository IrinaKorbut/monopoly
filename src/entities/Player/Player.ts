import Property from '../ifacies/Property';

export default class Player {
  readonly color: string;

  readonly name: string;

  readonly isHuman: boolean;

  playerCard: HTMLElement;

  position: number = 0;

  money: number = 1500;

  property: Array<Property> = [];

  chip: HTMLElement;

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

  addProperty(property: Property) {
    this.property.push(property);
  }
}
