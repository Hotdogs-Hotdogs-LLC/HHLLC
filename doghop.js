const gameContainer = document.getElementById('game-container');  // Get the game container element
const doghop = document.getElementById('doghop');  // Get the doghop element
const replayButton = document.getElementById('replay-button');  // Get the replay button element
const startScreen = document.getElementById('start-screen');  // Get the start screen element

let isJumping = false;  // Flag to track if the dog is currently jumping
let isGameOver = false;  // Flag to track if the game is over
let isCrouching = false;  // Flag to track if the dog is currently crouching
let doghopBottom = 0;  // Initial position of the dog
let flyTimerId;  // Timer ID for fly obstacles

gameContainer.classList.add('hidden'); // Instead of gameContainer.style.display = 'none';

const startButton = document.getElementById('start-button');  // Get the start button element

function startGame() {
  if (isGameOver) return;  // If the game is already over, return

  startScreen.style.display = 'none';  // Hide the start screen
  gameContainer.style.display = 'flex';  // Show the game container

  moveObstacle();  // Start moving the obstacles
  moveFlyObstacle();  // Start moving the fly obstacles
}

startButton.addEventListener('click', startGame);  // Add click event listener to the start button

function jump() {
  if (isJumping || isCrouching) return;  // If the dog is already jumping or crouching, return

  isJumping = true;  // Set the jumping flag to true
  let jumpInterval = setInterval(function () {
    if (doghopBottom >= 100) {
      clearInterval(jumpInterval);  // Stop the jump when reaching the maximum height
      let fallInterval = setInterval(function () {
        if (doghopBottom <= 0) {
          clearInterval(fallInterval);  // Stop the fall when reaching the ground
          isJumping = false;  // Set the jumping flag to false
        } else {
          doghopBottom -= 2;  // Decrease the dog's position during the fall
          doghop.style.bottom = doghopBottom + 'px';  // Update the dog's style
        }
      }, 10);
    } else {
      doghopBottom += 8;  // Increase the dog's position during the jump
      doghop.style.bottom = doghopBottom + 'px';  // Update the dog's style
    }
  }, 10);
}

function crouch() {
  if (isJumping) return;  // If the dog is currently jumping, return

  if (!isCrouching) {
    isCrouching = true;  // Set the crouching flag to true
    doghop.style.width = '25px';  // Adjust the dog's width
    doghop.style.height = '25px';  // Adjust the dog's height
    doghop.style.backgroundImage = "url('crouch.png')";  // Set the crouching image
    doghop.style.animation = 'none';  // Stop the dog's walking animation
  } else {
    isCrouching = false;  // Set the crouching flag to false
    doghop.style.width = '50px';  // Restore the dog's width
    doghop.style.height = '50px';  // Restore the dog's height
    doghop.style.background     = "url('run1.png')";  // Set the running image
    doghop.style.animation = 'walk 0.5s steps(3) infinite';  // Start the dog's walking animation
  }
}

function moveObstacle() {
  let obstacleLeft = window.innerWidth;  // Initial position of the obstacle

  const obstacle = document.createElement('div');  // Create a new obstacle element
  obstacle.classList.add('obstacle');  // Add the 'obstacle' class to the element
  obstacle.style.left = obstacleLeft + 'px';  // Set the initial position of the obstacle
  gameContainer.appendChild(obstacle);  // Add the obstacle to the game container

  let obstacleInterval = setInterval(function () {
    if (obstacleLeft < -50) {
      clearInterval(obstacleInterval);  // Stop moving the obstacle when it goes off the screen
      obstacle.remove();  // Remove the obstacle element from the DOM
    } else if (
      obstacleLeft > 0 &&
      obstacleLeft < 50 &&
      doghopBottom > 150 &&
      !isCrouching
    ) {
      gameOver();  // If the dog collides with the obstacle, it's game over
    } else {
      obstacleLeft -= 5;  // Move the obstacle to the left
      obstacle.style.left = obstacleLeft + 'px';  // Update the obstacle's position
    }
  }, 20);
}

function moveFlyObstacle() {
  let flyObstacleTop = Math.random() * (window.innerHeight - 150);  // Randomize the vertical position of the fly obstacle
  let flyObstacleLeft = window.innerWidth;  // Initial position of the fly obstacle

  const flyObstacle = document.createElement('div');  // Create a new fly obstacle element
  flyObstacle.classList.add('fly-obstacle');  // Add the 'fly-obstacle' class to the element
  flyObstacle.style.top = flyObstacleTop + 'px';  // Set the initial vertical position of the fly obstacle
  flyObstacle.style.left = flyObstacleLeft + 'px';  // Set the initial horizontal position of the fly obstacle
  gameContainer.appendChild(flyObstacle);  // Add the fly obstacle to the game container

  let flyInterval = setInterval(function () {
    if (flyObstacleLeft < -50) {
      clearInterval(flyInterval);  // Stop moving the fly obstacle when it goes off the screen
      flyObstacle.remove();  // Remove the fly obstacle element from the DOM
    } else if (
      flyObstacleLeft > 0 &&
      flyObstacleLeft < 50 &&
      doghopBottom < flyObstacleTop + 150 &&
      !isCrouching
    ) {
      gameOver();  // If the dog collides with the fly obstacle, it's game over
    } else {
      flyObstacleLeft -= 5;  // Move the fly obstacle to the left
      flyObstacle.style.left = flyObstacleLeft + 'px';  // Update the fly obstacle's position
    }
  }, 20);

  flyTimerId = setTimeout(moveFlyObstacle, Math.random() * 3000 + 2000);  // Schedule the next fly obstacle
}

function gameOver() {
  clearInterval(flyTimerId);  // Stop the fly obstacle timer
  isGameOver = true;  // Set the game over flag to true
  replayButton.style.display = 'block';  // Show the replay button
}

function resetGame() {
  isGameOver = false;
  isJumping = false;
  isCrouching = false;
  doghopBottom = 0;
  doghop.style.bottom = doghopBottom + 'px';
  gameContainer.innerHTML = '';
  replayButton.style.display = 'none';
}

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

document.addEventListener('keyup', function (event) {
  if (event.code === 'ArrowDown') {
    if (!isGameOver) {
      crouch();
    }
  }
});

replayButton.addEventListener('click', function () {
  resetGame();
  startGame();
});

window.addEventListener('load', function () {
  startScreen.style.display = 'block';
});
