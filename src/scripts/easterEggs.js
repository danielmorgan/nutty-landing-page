import {
  triggerAcornRain,
  triggerKonamiAcornRain,
} from "./particleSystem.js";

const acornSticker = document.getElementById("acorn-sticker-trigger");
if (acornSticker) {
  acornSticker.addEventListener("click", triggerAcornRain); // Keep original single-click behavior if desired, or remove
  let tapCount = 0;
  let lastTapTime = 0;
  const TAP_THRESHOLD = 7; // Number of taps required
  const TIME_WINDOW = 1500; // Milliseconds - adjust as needed

  acornSticker.addEventListener("click", (event) => {
    const currentTime = new Date().getTime();

    if (currentTime - lastTapTime < TIME_WINDOW) {
      tapCount++;
    } else {
      // Reset if tap is outside the time window or if it's the first tap
      tapCount = 1;
    }
    lastTapTime = currentTime;

    if (tapCount >= TAP_THRESHOLD) {
      triggerKonamiAcornRain();
      tapCount = 0; // Reset after triggering
    } else {
      // If you want the single tap to still trigger the normal rain:
      if (tapCount === 1 && !(currentTime - lastTapTime < TIME_WINDOW)) {
        // ensure it's a "fresh" single tap
        triggerAcornRain(event);
      }
    }
  });
}

// Konami Code Easter Egg
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiIndex = 0;

document.addEventListener("keydown", (event) => {
  if (event.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      triggerKonamiAcornRain();
      konamiIndex = 0; // Reset for future attempts
    }
  } else {
    // If the key is wrong, reset progress, but if it's the start of the code, count it.
    if (event.key === konamiCode[0]) {
      konamiIndex = 1;
    } else {
      konamiIndex = 0;
    }
  }
});
