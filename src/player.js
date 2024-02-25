import { computerGameBoard, playerGameBoard } from "./index";
// import { isValid } from "./isValid"; 


export function playerTurn(board) {
  return new Promise((resolve) => {
    // Add event listener to handle player's click on computer's cells
    const computerCells = document.querySelectorAll(".computer-cell.blank");

    function clickHandler() {
      // Extract coordinates from cell id or data attribute
      const coordinates = this.id.split("-").map(Number);
      const [x, y] = coordinates;

      // Call the function to attack the computer's cell
      board.receiveAttack(x, y);

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

export function placePlayerShips(ship) {
  return new Promise((resolve) => {
    const playerCells = document.querySelectorAll(".player-cell.blank");

    function mouseoverHandler() {
      const coordinates = this.id.split("-").map(Number);
      const [x, y] = coordinates;

      let isHorizontal;
      const orientation = document.querySelector(".orientation-btn");
      if (orientation.textContent === "Horizontal") {
        isHorizontal = true;
      } else {
        isHorizontal = false;
      }

      // Highlight cells based on ship's length and orientation
      if (isHorizontal) {
        for (let i = 0; i < ship.length; i++) {
          const cell = document.getElementById(`${x}-${y + i}`);
          if (cell) {
            cell.classList.add("highlight");
          }
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          const cell = document.getElementById(`${x + i}-${y}`);
          if (cell) {
            cell.classList.add("highlight");
          }
        }
      }
    }

    function mouseoutHandler() {
      document.querySelectorAll(".highlight").forEach((cell) => {
        cell.classList.remove("highlight");
      });
    }

    function clickHandler() {
      const coordinates = this.id.split("-").map(Number);
      const [x, y] = coordinates;

      let isHorizontal;
      const orientation = document.querySelector(".orientation-btn");
      if (orientation.textContent === "Horizontal") {
        isHorizontal = true;
      } else {
        isHorizontal = false;
      }

      playerGameBoard.placeShip(ship, x, y, isHorizontal);

      // Remove event listeners after placing ship
      playerCells.forEach((cell) => {
        cell.removeEventListener("mouseover", mouseoverHandler);
        cell.removeEventListener("mouseout", mouseoutHandler);
        cell.removeEventListener("click", clickHandler);
      });

      resolve();
    }

    playerCells.forEach((cell) => {
      cell.addEventListener("mouseover", mouseoverHandler);
      cell.addEventListener("mouseout", mouseoutHandler);
      cell.addEventListener("click", clickHandler);
    });
  });
}
