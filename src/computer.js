import { computerGameBoard } from "./index";
import { isValid } from "./isValid"; 

// Handle Computer's Turn
export function computerTurn(board) {
  // Implement computer logic for a random move
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  board.receiveAttack(x, y);
}

// Randomly places computer ships
export function placeComputerShips(ship) {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  const randomBoolean = Math.random() < 0.5;
  let isHorizontal = randomBoolean;

  if (isValid(ship, x, y, isHorizontal, computerGameBoard)) {
    computerGameBoard.placeShip(ship, x, y, isHorizontal);
  } else {
    placeComputerShips(ship);
  }
}