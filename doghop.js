 // JavaScript code

        // Get references to game elements
        const startScreen = document.getElementById('start-screen');
        const replayButton = document.getElementById('replay-button');
        const gameContainer = document.getElementById('game-container');
        const doghop = document.getElementById('doghop');

        // Initialize game variables
        let isJumping = false;
        let is
        let isCrouching = false;
        let isGameOver = false;
        let doghopBottom = 0;
        let gravity = 5;
        let obstacleTimerId;
        let score = 0;

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
            if (isCrouching) return;

            isCrouching = true;
            doghop.classList.add('crouching');

            setTimeout(function () {
                doghop.classList.remove('crouching');
                isCrouching = false;
            }, 1000); // Adjust crouching duration as needed
        }

        // Function to move the obstacles
        function moveObstacle() {
            let initialDelay = Math.random() * 4000 + 2000;
            obstacleTimerId = setTimeout(function () {
                createObstacle();
                moveObstacle();
            }, initialDelay);
        }

        // Function to create an obstacle
        function createObstacle() {
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
                    newObstacle.offsetTop < doghop.offsetTop + doghop.offsetHeight &&
                    newObstacle.offsetTop + newObstacle.offsetHeight > doghop.offsetTop
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

        // Function to handle game over
        function gameOver() {
            clearInterval(obstacleTimerId);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Game Over</h1><p class="score">Score: ' + score + '</p>';
        }

        // Function to start the game
        function startGame() {
            isGameOver = false;
            score = 0;
            doghopBottom = 0;
            doghop.style.bottom = doghopBottom + 'px';
            startScreen.style.display = 'none';
            gameContainer.style.display = 'block';
            moveObstacle();
        }

        // Event listener for keydown event to make the doghop jump or crouch
        document.addEventListener('keydown', function (event) {
            if (isGameOver) return;

            if (event.code === 'Space') {
                jump();
            } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
                crouch();
            }
        });

        // Event listener for replay button click
        replayButton.addEventListener('click', function () {
            startGame();
        });
           
