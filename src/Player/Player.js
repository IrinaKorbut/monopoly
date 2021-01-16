export default class Player {
  constructor(color, name) {
    this.color = color;
    this.name = name;
    this._position = 0;
    this.property = [];
    this.money = 1500;
  }

  get position() {
    return this._position;
  }

  set position(position) {
    this._position = position;
  }

  addMoney(quantity) {
    this.money += quantity;
  }

  subtractMoney(quantity) {
    if (quantity <= this.money) {
      this.money -= quantity;
      return true;
    }
    return false;
  }

  addProperty(property) {
    this.property.push(property);
  }
}
