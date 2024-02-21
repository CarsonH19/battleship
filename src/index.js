// import "./style.css";

export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;
    if (this.hits === this.length) {
      this.sunk = true;
    }
  }

  isSunk() {
    return this.sunk;
  }
}

export class GameBoard {
  constructor(gridSize = 10) {
    this.gridSize = gridSize;
    this.grid = this.createGrid();
    this.ships = [];
    this.missedAttacks = [];
  }

  createGrid() {
    return (
      Array.from({ length: this.gridSize }),
      () => Array(this.gridSize).fill(null)
    );
  }

  placeShip (ship, x, y, orientation) {
    if (orientation === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        this.grid[x + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.grid[x][y + i] = ship;
      }
    }
    this.ships.push({ ship, x, y, orientation });
  }
}
