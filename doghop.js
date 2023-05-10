// Get references to game elements
const doghop = document.getElementById('doghop');
const scoreElement = document.getElementById('score');

// Initialize game variables
let isJumping = false;
let isGameOver = false;
let doghopBottom = 0;
let gravity = 5;
let score = 0;
let obstacleTimeoutId;

// Function to make the doghop jump
function jump() {
  if (isJumping) return;

  isJumping = true;
  let jumpInterval = setInterval(function () {
    if (doghopBottom >= 100) {
      // Adjust the maximum jumping height (e.g., from 250 to 200)
      clearInterval(jumpInterval);
      let fallInterval = setInterval(function () {
        if (doghopBottom <= 0) {
          clearInterval(fallInterval);
          isJumping = false;
        } else {
          doghopBottom -= 2.5; // Adjust the speed at which the doghop comes down (e.g., from 2 to 5)
          doghop.style.bottom = doghopBottom + 'px';
        }
      }, 10); // Adjust the interval (e.g., from 20 to 10)
    } else {
      doghopBottom += 8; // Adjust the jump height (e.g., from 30 to 15)
      doghop.style.bottom = doghopBottom + 'px';
    }
  }, 10); // Adjust the interval (e.g., from 20 to 10)
}

// Function to move the obstacles
function moveObstacles() {
  let initialDelay = Math.random() * 4000 + 2000;
  obstacleTimeoutId = setTimeout(function () {
    createGroundObstacle();
    createFlyingObstacle();
    obstacleTimeoutId = undefined; // Clear the timeout id
    moveObstacles(); // Set a new timeout after creating the obstacles
  }, initialDelay);
}

// Function to create a ground obstacle
function createGroundObstacle() {
  const newObstacle = document.createElement('div');
  newObstacle.classList.add('obstacle');
  newObstacle.style.left = '500px';

  // Append the obstacle to the game container
  document.getElementById('game').appendChild(newObstacle);

  // Move the obstacle
  const obstacleMoveTimerId = setInterval(function () {
    newObstacle.style.left = parseInt(newObstacle.style.left) - 5 + 'px'; // Adjust the speed as needed

    // Check collision with the doghop
    if (
      newObstacle.offsetLeft < doghop.offsetLeft + doghop.offsetWidth &&
      newObstacle.offsetLeft + newObstacle.offsetWidth > doghop.offsetLeft &&
      newObstacle.offsetTop + newObstacle.offsetHeight > doghop.offsetTop &&
      newObstacle.offsetTop < doghop.offsetTop + doghop.offsetHeight &&
      doghopBottom >= 0
    ) {
      gameOver();
    }

    // Remove the obstacle when it goes off the screen
    if (newObstacle.offsetLeft < -50) {
      newObstacle.remove();
      clearInterval(obstacleMoveTimerId);
    }
  }, 20);
}
