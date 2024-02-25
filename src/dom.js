import { gameLoop } from "./index";

export function startGame() {
  const startBtn = document.getElementById("start-btn");

  startBtn.addEventListener("click", () => {
    const content = document.querySelector(".content");
    const gameWindow = document.querySelector(".game-window");
    gameWindow.style.display = "flex";
    content.style.display = "none";
    gameLoop();
  });
}

export function toggleOrientation() {
  const orientationButton = document.querySelector(".orientation-btn");

  orientationButton.addEventListener("click", () => {
    if (orientationButton.textContent === "Horizontal") {
      orientationButton.textContent = "Vertical";
    } else {
      orientationButton.textContent = "Horizontal";
    }
  });
}
