import { Ship } from "./index.js"

// Battleship 


// class Ship (init./hit()/isSunk())
test("should initialize a new ship", () => {
  const ship = new Ship(3); 
  expect(ship).toEqual({
      length : 3,
      hits : 0,
      sunk : false,
  });
});

test("should increment a hit", () => {
	const ship = new Ship(3);
	ship.hit();
	expect(ship).toEqual({
		length : 3,
		hits : 1,
		sunk : false,
	});
});

test("should show this.sunk is false", () => {
	const ship = new Ship(3);
	ship.hit();
	ship.hit();
	ship.hit();
	expect(ship).toEqual({
		length : 3,
		hits : 3,
		sunk : true,
	});
});


// class GameBoard (init./placeShip()/receiveAttack()/allShipsSunk())

// class Player

// gameLoop
