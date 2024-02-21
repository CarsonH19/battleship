import { Ship } from "./index.js";

// class Ship
test("should initialize a new ship", () => {
  const ship = new Ship(3);
  expect(ship).toEqual({
    length: 3,
    hits: 0,
    sunk: false,
  });
});

test("should increment a hit", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship).toEqual({
    length: 3,
    hits: 1,
    sunk: false,
  });
});

test("should show this.sunk is false", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship).toEqual({
    length: 3,
    hits: 3,
    sunk: true,
  });
});

// class GameBoard (init./placeShip()/receiveAttack()/allShipsSunk())
test("should init. GameBoard", () => {
  const board = new GameBoard();
  expect(board).toEqual({
    gridSize: 10,
    grid: [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ],
    ships: [],
    missedAttacks: [],
  });
});

test("should place a ship on a grid", () => {
  const board = new GameBoard();
  const battleship = new Ship(4);
  board.placeShip(battleship, 5, 5, "horizontal");
  expect(board.grid[5][5]).toEqual(battleship);
});

test("should add a ship to the  ships array", () => {
  const board = new GameBoard();
  const battleship = new Ship(4);
  board.placeShip(battleship, 5, 5, "horizontal");
  expect(board.ships).toEqual({});
});

// class Player

// gameLoop
