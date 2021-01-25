import Player from "../Player/Player";

export default class Cell {
  readonly type: string;
  readonly name: string;
  readonly element: HTMLElement;
  position: number;

  constructor(type: string, name: string, position: number) {
    this.type = type;
    this.name = name;
    this.position = position;
    this.element = document.getElementById(`${position}`);
  }
}