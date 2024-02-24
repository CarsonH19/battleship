export function toggleOrientation() {
  const orientationButton = document.querySelector(".orientation-btn");

  orientationButton.addEventListener("click", () => {
    if (orientationButton.textContent === "Horizontal") {
      orientationButton.textContent = "Vertical";
    } else {
      orientationButton.textContent = "Horizontal";
    }

    console.log("clicked");
  });
}
