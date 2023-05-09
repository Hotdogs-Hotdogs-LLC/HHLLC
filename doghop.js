// JavaScript code

// Get references to game elements
const gameContainer = document.getElementById('game-container');
const doghop = document.getElementById('doghop');
const replayButton = document.getElementById('replay-button');
const startScreen = document.getElementById('start-screen');

// Initialize game variables
let isJumping = false;
let isGameOver = false;
let isCrouching = false;
let doghopBottom = 0;
let gravity = 5;
let obstacleTimerId;
let flyTimerId;

// Function to start the game
function startGame() {
    if (isGameOver) return;

    // Hide the start screen
    startScreen.style.display = 'none';

    // Show the game container
    gameContainer.style.display = 'flex';

    moveObstacle();
}

// Event listener for start button click
startButton.addEventListener('click', startGame);


// Function to make the doghop jump
function jump() {
  if (isJumping || isCrouching) return;

  isJumping = true;
  let jumpInterval = setInterval(function () {
    if (doghopBottom >= 100) {
      clearInterval(jumpInterval);
      let fallInterval = setInterval(function () {
        if (doghopBottom <= 0) {
          clearInterval(fallInterval);
          isJumping = false;
        } else {
          doghopBottom -= 2;
          doghop.style.bottom = doghopBottom + 'px';
        }
      }, 10);
    } else {
      doghopBottom += 8;
      doghop.style.bottom = doghopBottom + 'px';
    }
  }, 10);
}

// Function to make the doghop crouch
function crouch() {
  if (isJumping) return;

  if (!isCrouching) {
    isCrouching = true;
    doghop.style.width = '25px';
    doghop.style.height = '25px';
    doghop.style.backgroundImage = "url('crouch.png')";
    doghop.style.animation = 'none';
  } else {
    isCrouching = false;
    doghop.style.width = '50px';
    doghop.style.height = '50px';
    doghop.style.backgroundImage = "url('run1.png')";
    doghop.style.animation = 'walk 0.5s steps(3) infinite';
  }
}

// Function to move the obstacle
function moveObstacle() {
  let obstacleLeft = window.innerWidth;

  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = obstacleLeft + 'px';
  gameContainer.appendChild(obstacle);

  let obstacleInterval = setInterval(function () {
    if (obstacleLeft < -50) {
      clearInterval(obstacleInterval);
      obstacle.remove();
    } else if (
      obstacleLeft > 0 &&
      obstacleLeft < 50 &&
      doghopBottom > 150 &&
      !isCrouching
    ) {
      gameOver();
    } else {
      obstacleLeft -= 5;
      obstacle.style.left = obstacleLeft + 'px';
    }
  }, 20);
}

// Function to move the flying obstacle
function moveFlyObstacle() {
  let flyObstacleTop = Math.random() * (window.innerHeight - 150);
  let flyObstacleLeft = window.innerWidth;

  const flyObstacle = document.createElement('div');
  flyObstacle.classList.add('fly-obstacle');
  flyObstacle.style.top = flyObstacleTop + 'px';
  flyObstacle.style.left = flyObstacleLeft + 'px';
  gameContainer.appendChild(flyObstacle);

  let flyInterval = setInterval(function () {
    if (flyObstacleLeft < -50) {
      clearInterval(flyInterval);
      flyObstacle.remove();
    } else if (
      flyObstacleLeft > 0 &&
      flyObstacleLeft < 50 &&
      doghopBottom < flyObstacleTop + 150 &&
      !isCrouching
    ) {
      gameOver();
    } else {
      flyObstacleLeft -= 5;
      flyObstacle.style.left = flyObstacleLeft + 'px';
    }
  }, 20);

  flyTimerId = setTimeout(moveFlyObstacle, Math.random() * 3000 + 2000);
}

// Function to handle game over
function gameOver() {
  clearInterval(obstacleTimerId);
  clearTimeout(flyTimerId);
  isGameOver = true;
  replayButton.style.display = 'block';
}

// Function to reset the game
function resetGame() {
  isGameOver = false;
  isJumping = false;
  isCrouching = false;
  doghopBottom = 0;
  doghop.style.bottom = doghopBottom + 'px';
  gameContainer.innerHTML = '';
  replayButton.style.display = 'none';
}

// Event listener for keydown events
document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    if (!isGameOver) {
      jump();
    } else {
      resetGame();
      startGame();
    }
  } else if (event.code === 'ArrowDown') {
    if (!isGameOver) {
      crouch();
    }
  }
});

// Event listener for keyup events
document.addEventListener('keyup', function (event) {
  if (event.code === 'ArrowDown') {
    if (!isGameOver) {
      crouch();
    }
  }
});

// Event listener for replay button click
replayButton.addEventListener('click', function () {
  resetGame();
  startGame();
});

// Start the game on window load
window.addEventListener('load', function () {
  startScreen.style.display = 'block';
});
