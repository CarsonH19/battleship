import { GameBoard } from "./gameBoard";
import { Ship } from "./ship";

const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
  const content = document.querySelector(".content");
  const gameWindow = document.querySelector(".game-window");
  gameWindow.style.display = "flex";
  content.style.display = "none";
  playerGameBoard.renderGameBoard("player-gameboard");
  computerGameBoard.renderGameBoard("computer-gameboard");
  gameLoop();

  // add function to let player place boats
  // add function to randomly place computer boats
});

// add readyBtn to begin the game after placing boats
// readyBtn.addEventListener('click', () => {
//   // render the board with boats placed.
// });

const playerGameBoard = new GameBoard();
const playerCarrier = new Ship(5);
const playerBattleship = new Ship(4);
const playerCruiser = new Ship(3);
const playerSubmarine1 = new Ship(3);
const playerSubmarine2 = new Ship(3);
const playerDestroyer1 = new Ship(2);
const playerDestroyer2 = new Ship(2);
// place player ships
playerGameBoard.placeShip(playerCarrier, 1, 5, true);
console.log(playerGameBoard.grid);
playerGameBoard.placeShip(playerBattleship, 2, 5, true);
playerGameBoard.placeShip(playerCruiser, 3, 5, true);
playerGameBoard.placeShip(playerSubmarine1, 4, 5, true);
playerGameBoard.placeShip(playerSubmarine2, 5, 5, true);
playerGameBoard.placeShip(playerDestroyer1, 6, 5, true);
playerGameBoard.placeShip(playerDestroyer2, 7, 5, true);

const computerGameBoard = new GameBoard();
const computerCarrier = new Ship(5);
const computerBattleship = new Ship(4);
const computerCruiser = new Ship(3);
const computerSubmarine1 = new Ship(3);
const computerSubmarine2 = new Ship(3);
const computerDestroyer1 = new Ship(2);
const computerDestroyer2 = new Ship(2);

console.log(computerGameBoard.grid);

// place computer ships
placeComputerShips(computerCarrier);
placeComputerShips(computerBattleship);
placeComputerShips(computerCruiser);
placeComputerShips(computerSubmarine1);
placeComputerShips(computerSubmarine2);
placeComputerShips(computerDestroyer1);
placeComputerShips(computerDestroyer2);

console.log(computerGameBoard.grid);

// Randomly places computer ships
function placeComputerShips(ship) {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  const randomBoolean = Math.random() < 0.5;
  let isHorizontal = randomBoolean;

  if (isValid(x, y, isHorizontal)) {
    computerGameBoard.placeShip(ship, x, y, isHorizontal);
    console.log(`${x}, ${y}`);
  } else {
    placeComputerShips(ship);
  }

  // Check if ship fits on board and does not overlap
  function isValid(x, y, isHorizontal) {
    // Check if ship goes out of the board's grid
    if (isHorizontal) {
      if (y + ship.length > 10 || x >= 10) {
        return false;
      }
      for (let i = y; i < y + ship.length - 1; i++) {
        if (computerGameBoard.grid[x][i] !== null) {
          return false;
        }
      }
    } else {
      if (x + ship.length > 10 || y >= 10) {
        return false;
      }
      for (let i = x; i < x + ship.length - 1; i++) {
        if (computerGameBoard.grid[i][y] !== null) {
          return false;
        }
      }
    }

    return true;
  }
}

async function gameLoop() {
  // Initialize game state
  let gameOver = false;

  // Game loop
  while (!gameOver) {
    // Player's turn
    console.log("Player, choose a cell");
    await playerTurn(computerGameBoard);
    computerGameBoard.renderGameBoard("computer-gameboard");

    // Check if player's move resulted in game over
    if (computerGameBoard.allShipsSunk()) {
      gameOver = true;
      alert("Player Wins!");
      break;
    }

    // Delay before computer's turn
    await delay(3000); // Adjust delay time as needed

    // Computer's turn
    computerTurn(playerGameBoard);
    playerGameBoard.renderGameBoard("player-gameboard");
    console.log("Computer attacks!");

    // Check if computer's move resulted in game over
    if (playerGameBoard.allShipsSunk()) {
      gameOver = true;
      alert("Computer Wins!");
      break;
    }

    // Repeat the loop
  }

  // Game over, display result
  // displayGameResult();
  // Handle Player's Turn
  function playerTurn() {
    return new Promise((resolve) => {
      // Add event listener to handle player's click on computer's cells
      const computerCells = document.querySelectorAll(".computer-cell.blank");

      function clickHandler() {
        // Extract coordinates from cell id or data attribute
        const coordinates = this.id.split("-").map(Number);
        const [x, y] = coordinates;

        // Call the function to attack the computer's cell
        computerGameBoard.receiveAttack(x, y);

        // Remove event listener after the player's turn
        computerCells.forEach((cell) => {
          cell.removeEventListener("click", clickHandler);
        });

        // Resolve the promise to indicate the end of the player's turn
        resolve();
      }

      computerCells.forEach((cell) => {
        cell.addEventListener("click", clickHandler);
      });
    });
  }

  // Handle Computer's Turn
  function computerTurn(playerGameBoard) {
    // Implement computer logic for a random move
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    playerGameBoard.receiveAttack(x, y);
  }

  function delay(ms) {
    // Function to introduce delay using Promise
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
