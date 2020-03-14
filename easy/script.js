var sound = new Audio('https://raw.githubusercontent.com/J-Sanderson/misc-visualisation/master/easy/Staples%20%20Easy%20Button%20%20Sound%20Effect.mp3');

document.getElementById("easy").addEventListener("click", function() {
  sound.play();
});
