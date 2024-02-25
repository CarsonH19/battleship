import { GameBoard } from "./gameBoard";
import { Ship } from "./ship";
import { startGame, toggleOrientation } from "./dom";
import { computerTurn, placeComputerShips } from "./computer";
import { playerTurn, placePlayerShips } from "./player";

// Initialize event listeners
startGame();
toggleOrientation();

// Initialize player board & ships
export const playerGameBoard = new GameBoard();
const playerCarrier = new Ship(5);
const playerBattleship = new Ship(4);
const playerCruiser = new Ship(3);
const playerSubmarine1 = new Ship(3);
const playerSubmarine2 = new Ship(3);
const playerDestroyer1 = new Ship(2);
const playerDestroyer2 = new Ship(2);
let playerShips = [
  playerCarrier,
  playerBattleship,
  playerCruiser,
  playerSubmarine1,
  playerSubmarine2,
  playerDestroyer1,
  playerDestroyer2,
];

// Initialize computer board & ships
export const computerGameBoard = new GameBoard();
const computerCarrier = new Ship(5);
const computerBattleship = new Ship(4);
const computerCruiser = new Ship(3);
const computerSubmarine1 = new Ship(3);
const computerSubmarine2 = new Ship(3);
const computerDestroyer1 = new Ship(2);
const computerDestroyer2 = new Ship(2);

export async function gameLoop() {
  let gameOver = false;
  playerGameBoard.renderGameBoard("player-gameboard");

  // place computer ships
  placeComputerShips(computerCarrier);
  placeComputerShips(computerBattleship);
  placeComputerShips(computerCruiser);
  placeComputerShips(computerSubmarine1);
  placeComputerShips(computerSubmarine2);
  placeComputerShips(computerDestroyer1);
  placeComputerShips(computerDestroyer2);

  // player places ships
  while (playerShips.length > 0) {
    await placePlayerShips(playerShips[0]);
    if (playerGameBoard.ships[0].ship === playerShips[0]) {
      playerShips.shift();
    }
    playerGameBoard.renderGameBoard("player-gameboard");
  }

  // hide orientation button after boats are placed
  const orientationButton = document.querySelector(".orientation-btn");
  orientationButton.style.display = "none";

  // render computer's board after player places ships
  computerGameBoard.renderGameBoard("computer-gameboard");

  // Start Game loop
  while (!gameOver) {
    // player's turn
    await playerTurn(computerGameBoard);
    computerGameBoard.renderGameBoard("computer-gameboard");

    // check if player wins
    if (computerGameBoard.allShipsSunk()) {
      gameOver = true;
      alert("Player Wins!");
      break;
    }

    // delay before computer's turn
    await delay(2000); // Adjust delay time as needed

    // computer's turn
    computerTurn(playerGameBoard);
    playerGameBoard.renderGameBoard("player-gameboard");

    // check if computer wins
    if (playerGameBoard.allShipsSunk()) {
      gameOver = true;
      alert("Computer Wins!");
      break;
    }
  }

  function gameOver() {

  }
  
  function displayGameResult() {

  }

  function delay(ms) {
    // Function to introduce delay using Promise
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
