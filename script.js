const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Start game on keypress
document.addEventListener("keydown", function () {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

// Button clicks
const buttons = document.querySelectorAll(".btn");
buttons.forEach(btn => {
  btn.addEventListener("click", function () {
    const userColor = this.id;
    userClickedPattern.push(userColor);

    playSound(userColor);
    animatePress(userColor);

    checkAnswer(userClickedPattern.length - 1);
  });
});

// Sequence Generator
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;

  const randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);

  setTimeout(() => {
    flashButton(randomChosenColor);
    playSound(randomChosenColor);
  }, 500);
}

// Check Answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";

    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 200);

    startOver();
  }
}

// Animations & Sounds
function flashButton(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 200);
}

function animatePress(color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 100);
}

function playSound(color) {
  const sound = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${buttonColors.indexOf(color) + 1}.mp3`);
  sound.play();
}

// Restart
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
