import { GameBoard } from "./gameBoard";
import { Ship } from "./ship";
import { startGame, toggleOrientation } from "./dom";
import { computerTurn, placeComputerShips } from "./computer";
import { playerTurn, placePlayerShips } from "./player";
import { displayText } from "./text";

// Initialize event listeners
startGame();
toggleOrientation();

// Initialize player board & ships
export const playerGameBoard = new GameBoard();
const playerCarrier = new Ship("Carrier", 5);
const playerBattleship = new Ship("Battleship", 4);
const playerCruiser = new Ship("Cruiser", 3);
const playerSubmarine1 = new Ship("Submarine", 3);
const playerSubmarine2 = new Ship("Submarine", 3);
const playerDestroyer1 = new Ship("Destroyer", 2);
const playerDestroyer2 = new Ship("Destroyer", 2);
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
const computerCarrier = new Ship("Carrier", 5);
const computerBattleship = new Ship("Battleship", 4);
const computerCruiser = new Ship("Cruiser", 3);
const computerSubmarine1 = new Ship("Submarine", 3);
const computerSubmarine2 = new Ship("Submarine", 3);
const computerDestroyer1 = new Ship("Destroyer", 2);
const computerDestroyer2 = new Ship("Destroyer", 2);

export let turn = 'Your'; // "Your" / "The enemy"

// place computer ships
placeComputerShips(computerCarrier);
placeComputerShips(computerBattleship);
placeComputerShips(computerCruiser);
placeComputerShips(computerSubmarine1);
placeComputerShips(computerSubmarine2);
placeComputerShips(computerDestroyer1);
placeComputerShips(computerDestroyer2);

export async function gameLoop() {
  let gameOver = false;
  playerGameBoard.renderGameBoard("player-gameboard");
  // const rightSide = document.querySelector('.right-side');
  // rightSide.style.display = none;

  // player places ships
  displayText("Admiral, ready your ships.");

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
  // rightSide.style.display = 'flex';

  // Start Game loop
  while (!gameOver) {
    // player's turn
    turn = 'Your';
    displayText("Admiral, where shall you strike?");

    await playerTurn(computerGameBoard);
    computerGameBoard.renderGameBoard("computer-gameboard");

    await delay(1500);

    // check if player wins
    if (computerGameBoard.allShipsSunk()) {
      displayText("All enemy ships have sunk! Mission accomplished!");
      gameOver = true;
      alert("Player Wins!");
      break;
    }

    // delay before computer's turn
    turn = 'The enemy';
    displayText("Enemy attack incoming!");
    await delay(1500);

    // computer's turn
    computerTurn(playerGameBoard);
    playerGameBoard.renderGameBoard("player-gameboard");

    await delay(1500);

    // check if computer wins
    if (playerGameBoard.allShipsSunk()) {
      displayText("All your ships have sunk! Mission failed!");
      gameOver = true;
      alert("Computer Wins!");
      break;
    }
  }

  // function gameOver() {}

  function delay(ms) {
    // Function to introduce delay using Promise
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
