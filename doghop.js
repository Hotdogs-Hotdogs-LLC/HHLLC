// Get references to game elements
const doghop = document.getElementById('doghop');
const scoreElement = document.getElementById('score');

// Initialize game variables
let isJumping = false;
let isGameOver = false;
let doghopBottom = 0;
let gravity = 5;
let score = 0;

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
let obstacleTimeoutId; // Declare a new variable for the timeout id
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
  newFlyingObstacle.offsetLeft < doghop.offsetLeft + doghop.offsetWidth &&
  newFlyingObstacle.offsetLeft + newFlyingObstacle.offsetWidth > doghop.offsetLeft &&
  newFlyingObstacle.offsetTop < doghop.offsetTop + doghop.offsetHeight &&
  newFlyingObstacle.offsetTop + newFlyingObstacle.offsetHeight > doghop.offsetTop &&
  doghopBottom <= newFlyingObstacle.offsetTop + newFlyingObstacle.offsetHeight
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
  const newFlyingObstacle = document.createElement('div');
  newFlyingObstacle.classList.add('flying-obstacle');
  newFlyingObstacle.style.left = '500px';

  // Append the flying obstacle to the game container
  document.getElementById('game').appendChild(newFlyingObstacle);

    // Move the flying obstacle
    const flyingObstacleMoveTimerId = setInterval(function () {
      newFlyingObstacle.style.left =
        parseInt(newFlyingObstacle.style.left) - 5 + 'px'; // Adjust the speed as needed

      // Check collision with the doghop
if (
  newFlyingObstacle.offsetLeft < doghop.offsetLeft + doghop.offsetWidth &&
  newFlyingObstacle.offsetLeft + newFlyingObstacle.offsetWidth > doghop.offsetLeft &&
  newFlyingObstacle.offsetTop < doghop.offsetTop + doghop.offsetHeight &&
  newFlyingObstacle.offsetTop + newFlyingObstacle.offsetHeight > doghop.offsetTop &&
  doghopBottom <= newFlyingObstacle.offsetTop + newFlyingObstacle.offsetHeight
) {
  gameOver();
}


      // Remove the flying obstacle when it goes off the screen
      if (newFlyingObstacle.offsetLeft < -50) {
        newFlyingObstacle.remove();
        clearInterval(flyingObstacleMoveTimerId);
      }
    }, 20);

    // Update the score when the obstacle passes successfully
    const scoreTimerId = setInterval(function () {
      if (!isGameOver) {
        score++;
        scoreElement.textContent = 'Score: ' + score;
      }
    }, 100);
  }

  // Function to end the game
  function gameOver() {
    isGameOver = true;
    clearTimeout(obstacleTimerId);

    // Display game over message
    alert('Game over! Your score is ' + score);

    // Reload the page to restart the game
    location.reload();
  }

  // Function to start the game
  function startGame() {
    if (isGameOver) return;

    jump();
    moveObstacles();

    // Event listener to make the doghop jump on arrow key press
    document.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowUp' || event.key === ' ') {
        jump();
      }
    });
  }

  // Call the startGame function initially
  startGame();
