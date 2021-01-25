export default class Cell {
  constructor(type, name, position) {
    this.type = type;
    this.name = name;
    this.position = position;
    this.element = document.getElementById(`${position}`);
  }
}
