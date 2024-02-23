import { Ship, GameBoard } from "./index.js";

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

// class GameBoard
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
  board.placeShip(battleship, 5, 5, true);
  expect(board.grid[5][5]).toBe(battleship);
});

test("should add a ship to the ships array", () => {
  const board = new GameBoard();
  const battleship = new Ship(4);
  board.placeShip(battleship, 5, 5, true);
  expect(board.ships).toEqual([
    {
      horizontal: true,
      ship: battleship,
      x: 5,
      y: 5,
    },
  ]);
});

test ("should increment hits on a ship", () => {
  const board = new GameBoard();
  const battleship = new Ship(4);
  board.placeShip(battleship, 5, 5, true);
  board.receiveAttack(5, 5);
  expect(battleship.hits).toBe(1);
})

test("should add miss to missedAttacks array", () => {
  const board = new GameBoard();
  const battleship = new Ship(4);
  board.placeShip(battleship, 5, 5, true);
  board.receiveAttack(8, 8);
  expect(board.missedAttacks.length).toBe(1);
  expect(board.missedAttacks).toEqual([
    {
      x: 8,
      y: 8,
    }
  ])
});

test("should return true when all ships are sunk", () => {
  const board = new GameBoard();
  const raft = new Ship(1);
  board.placeShip(raft, 5, 5, true);
  board.receiveAttack(5, 5);
  expect(board.allShipsSunk()).toBe(true);
});

// class Player

// gameLoop
