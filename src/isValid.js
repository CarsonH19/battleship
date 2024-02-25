import { playerGameBoard } from "./index";

// Check if ship fits on board and does not overlap
export function isValid(ship, x, y, isHorizontal, board = playerGameBoard) {
  // Check if ship goes out of the board's grid
  if (isHorizontal) {
    if (y + ship.length - 1 > 10 || x >= 10) {
      return false;
    }
    for (let i = y; i < y + ship.length - 1; i++) {
      if (board.grid[x][i] !== null) {
        return false;
      }
    }
  } else {
    if (x + ship.length - 1 > 10 || y >= 10) {
      return false;
    }
    for (let i = x; i < x + ship.length - 1; i++) {
      if (board.grid[i][y] !== null) {
        return false;
      }
    }
  }

  return true;
}