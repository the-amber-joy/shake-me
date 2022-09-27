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
  ntc.init();
}

function changeColors() {
  var randomColor1 = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
  var randomColor2 = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });

  document.body.style.backgroundColor = randomColor1;
  main.style.color = randomColor2;

  const color1 = ntc.name(randomColor1)[1];
  let bgColor = `a ${ntc.name(randomColor1)[1]}`;
  const color2 = ntc.name(randomColor2)[1];

  if (isVowel(color1.charAt(0))) {
    bgColor = `an ${color1}`
  }

  main.innerHTML = `${color2} Text on ${bgColor} Background`;
}

function isVowel(c) {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
}


// allow click to change color if no motion detection available on this device
const hasDeviceMotion = 'ondevicemotion' in window;
!hasMotionDetection ? onclick = () => changeColors() : null
