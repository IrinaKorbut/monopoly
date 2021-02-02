import Player from "../Player/Player";

export default class Cell {
  readonly type: string;
  readonly name: string;
  readonly russianName: string;
  readonly belarusianName: string;
  readonly element: HTMLElement;
  position: number;

  constructor(type: string, name: string, russianName: string, belarusianName: string, position: number) {
    this.type = type;
    this.name = name;
    this.russianName = russianName;
    this.belarusianName = belarusianName;
    this.position = position;
    this.element = document.getElementById(`${position}`);
  }
}