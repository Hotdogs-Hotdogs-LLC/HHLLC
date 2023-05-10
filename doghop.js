document.addEventListener('DOMContentLoaded', function() {

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
        clearInterval(jumpInterval);
        let fallInterval = setInterval(function () {
          if (doghopBottom <= 0) {
            clearInterval(fallInterval);
            isJumping = false;
          } else {
            doghopBottom -= 2.5;
            doghop.style.bottom = doghopBottom + 'px';
          }
        }, 10);
      } else {
        doghopBottom += 8;
        doghop.style.bottom = doghopBottom + 'px';
      }
    }, 10);
  }

  // Function to move the obstacles
  function moveObstacles() {
    let initialDelay = Math.random() * 4000 + 2000;
    obstacleTimeoutId = setTimeout(function () {
      createGroundObstacle();
      createFlyingObstacle();
      obstacleTimeoutId = undefined;
      moveObstacles();
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
      newObstacle.style.left = parseInt(newObstacle.style.left) - 5 + 'px';

      // Check collision with the doghop
      if (
        newObstacle.offsetLeft < doghop.offsetLeft + doghop.offsetWidth &&
        newObstacle.offsetLeft + newObstacle.offsetWidth > doghop.offsetLeft &&
        newObstacle.offsetTop + newObstacle.offsetHeight > doghop.offsetTop &&
        newObstacle.offsetTop < doghop.offsetTop + doghop.offsetHeight &&
        doghopBottom + doghop.offsetHeight >= newObstacle.offsetTop
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

  // Function to create a flying obstacle
  function createFlyingObstacle() {
    // Implement the creation and movement of flying obstacles here
    // Adjust the logic to position and move the flying obstacles accordingly
  }

  // Function to handle game over
  function gameOver() {
    isGameOver = true;
    clearTimeout(obstacleTimeoutId);
    // Implement your game over logic here
  }

  // Function to start the game
  function startGame() {
    // Reset game variables
    isJumping = false;
    isGameOver = false;
    doghopBottom = 0;
    score = 0;
    scoreElement.textContent = score;

    // Remove existing obstacles
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => obstacle.remove());

    // Move obstacles
    moveObstacles();
// Function to handle the jump action
function handleJump(event) {
  if (event.code === 'Space' && !isJumping && !isGameOver) {
    jump();
  }
}
});

// Call the startGame function to begin the game
startGame();

