import { Ship } from "./ship";
import { isValid } from "./index";

export class GameBoard {
  constructor(gridSize = 10) {
    this.gridSize = gridSize;
    this.grid = this.createGrid();
    this.ships = [];
    this.missedAttacks = [];
  }

  createGrid() {
    return Array.from({ length: this.gridSize }, () =>
      Array(this.gridSize).fill(null)
    );
  }

  renderGameBoard(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const table = document.createElement("table");
    for (let i = 0; i < this.gridSize; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < this.gridSize; j++) {
        const cell = document.createElement("td");
        cell.classList.add("cell");

        // Set id attribute with x, y coordinates
        cell.id = `${i}-${j}`;

        if (containerId === "player-gameboard") {
          cell.classList.add("player-cell");
          for (const shipObj of this.ships) {
            // Check if the ship occupies the specified grid location (i, j)
            if (
              shipObj.horizontal && // Ship is placed horizontally
              i === shipObj.x && // Row matches ship's starting row
              j >= shipObj.y && // Column is within the range of the ship's length
              j < shipObj.y + shipObj.ship.length // Column is within the range of the ship's length
            ) {
              // Add the "ship" class to the cell
              cell.classList.add("ship"); // blue color
            } else if (
              !shipObj.horizontal && // Ship is placed vertically
              i >= shipObj.x && // Row is within the range of the ship's length
              i < shipObj.x + shipObj.ship.length && // Row is within the range of the ship's length
              j === shipObj.y // Column matches ship's starting column
            ) {
              // Add the "ship" class to the cell
              cell.classList.add("ship"); // blue color
            }
          }

          // Event Listeners to place ships
          // cell.addEventListener("click", () => {
          //   this.placeShip(i, j);
          // });
        } else {
          cell.classList.add("computer-cell");
          cell.classList.add("blank"); // white smoke color
        }

        // add cell classes for hit & missed
        if (this.grid[i][j] === null) {
          cell.classList.add("blank"); // white smoke color
        } else if (this.grid[i][j] === "HIT") {
          cell.classList.add("hit"); // red color
        } else if (this.grid[i][j] === "MISS") {
          cell.classList.add("miss"); // dark gray color
          // turn off cursor/don't allow click
        }

        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    container.appendChild(table);
  }

  placeShip(ship, x, y, horizontal) {
    console.log(ship);
    console.log(x);
    console.log(y);
    console.log(horizontal);

    if (isValid(ship, x, y, horizontal)) {
      if (horizontal) {
        for (let i = 0; i < ship.length; i++) {
          this.grid[x][y + i] = ship;
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          console.log(ship);
          console.log(this.grid);
          console.log(`${x + i}, ${y}`);
          this.grid[x + i][y] = ship;
        }
      }
      this.ships.push({ ship, x, y, horizontal });
      console.log('Ship Placed!');
    } else {
      alert("Please choose a valid location!");
    }
  }

  receiveAttack(x, y) {
    const target = this.grid[x][y];
    if (target instanceof Ship) {
      target.hit();
      this.grid[x][y] = "HIT";
    } else {
      this.missedAttacks.push({ x, y });
      this.grid[x][y] = "MISS";
    }

    console.log(this.grid[x][y]);
  }

  allShipsSunk() {
    return this.ships.every((shipObj) => shipObj.ship.isSunk());
  }
}
