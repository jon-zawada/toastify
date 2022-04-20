import Toast from './Toast.js';

const positions = ["top-center", "top-right", "top-left", "bottom-right", "bottom-left", "bottom-center"];
function getRandom() {
  return positions[Math.floor(Math.random() * 6)];
}
document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({ text: "titties", position: getRandom()});
});

