import { displayText } from "./text";
import { turn } from "./index";


export class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;
    if (this.hits === this.length) {
      displayText(`${turn} ${this.name} has sunk!`);
      this.sunk = true;
    }
  }

  isSunk() {
    return this.sunk;
  }
}