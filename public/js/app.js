// VARIABLES
const main = document.getElementById("main");

// LISTENERS
var shakeEvent = new Shake({ threshold: 8 });
shakeEvent.start();
window.addEventListener("shake", () => changeColors(), false);

document.addEventListener("DOMContentLoaded", init, false);

// FUNCTIONS
function init() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../service-worker.js");
  }
}

function changeColors() {
  var randomColor1 = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
  var randomColor2 = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });

  main.style.backgroundColor = randomColor1;
  main.style.color = randomColor2;
}
