const hasMotionDetection = "ondevicemotion" in window;
const shakeEvent = new Shake({ threshold: 8 });

// LISTENERS
document.addEventListener("DOMContentLoaded", init, false);
function init() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../service-worker.js");
  }
  ntc.init();

  if (hasMotionDetection) {
    main.innerHTML = "SHAKE ME";
  } else {
    main.innerHTML = "CLICK ME";
  }
}

document.body.onclick = () => {
  // iOS 13+ feature detect
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    /**
     * The name "requestPermission" is a bit of a misnomer.
     * ... "requestPermission" checks if the permission is set and returns the status.
     * ONLY if not set does it activate the native request mechanism.
     * – E. Maggini
     * Aug 17, 2021 at 14:03
     * https://stackoverflow.com/questions/68815767/unable-to-check-devicemotionevent-permission-state#comment121622865_68816706
     */
    DeviceMotionEvent.requestPermission()
      .then((permissionState) => {
        // ig user GRANTS permission, or permisson was ALREADY granted...
        if (permissionState === "granted") {

          // Check to see is permission was already here or not...
          if (!("permissionGranted" in localStorage) || localStorage.getItem("permissionGranted") !== "true") {
            // if it wasn't, change text
            main.innerHTML = "SHAKE ME";
          }

          // if it was, do the thing
          localStorage.setItem("permissionGranted", "true");
          startShakeEvent();

        } else {
          // i guess if we can't get permission, just change on click
          changeColors()
        }
      })
      .catch(console.error);
  } else {
    // if this is not an iOS 13+ device,
    // check for motion. IF not, do the thing because we clicked.
    // if yes, use the Shake event 
    if (!hasMotionDetection) {
      changeColors();
    }
    startShakeEvent();
  }
};

// FUNCTIONS
function startShakeEvent() {
  shakeEvent.start();
  window.addEventListener("shake", () => changeColors(), false);
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
    bgColor = `an ${color1}`;
  }

  main.innerHTML = `${color2} Text on ${bgColor} Background`;
}

function isVowel(c) {
  return ["a", "e", "i", "o", "u"].indexOf(c.toLowerCase()) !== -1;
}
