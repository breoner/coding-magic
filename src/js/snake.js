const field = document.getElementById("game");
const context = field.getContext("2d");
const restartBtn = document.getElementById("restartBtn");

const startBackdrop = document.querySelector('[data-snake="backdrop"]');
const startButton = startBackdrop.querySelector('[data-snake="play"]');

startButton.addEventListener('click', () => {
  startBackdrop.classList.add('is-hidden');
  gameOver.classList.add('is-hidden');
  startGameLoop();
});

const fieldImg = new Image();
fieldImg.src = "../img/snake-bcg.png";

const foodImg = new Image();
foodImg.src = "../img/food.png";

const box = 32;

let snakeArr, food, dir, score, game;

const pauseBtn = document.getElementById("pauseBtn");
let isPaused = false;

pauseBtn.addEventListener("click", function() {
    if (!isPaused) {
        clearInterval(game);
        pauseBtn.textContent = "Resume";
        isPaused = true;
    } else {
        game = setInterval(drawGame, 150);
        pauseBtn.textContent = "Pause";
        isPaused = false;
    }
});


function initGame() {
    snakeArr = [];
    snakeArr[0] = { x: 9 * box, y: 10 * box };
    snakeArr[1] = { x: 8 * box, y: 10 * box };
    snakeArr[2] = { x: 7 * box, y: 10 * box };

    food = {
        x: Math.floor((Math.random() * 17) + 1) * box,
        y: Math.floor((Math.random() * 15) + 3) * box
    };

    dir = null;
    score = 0;

    restartBtn.classList.add("hidden");
    clearInterval(game);
    game = setInterval(drawGame, 150);
}


document.addEventListener("keydown", direction);

function direction(e) {
    e.preventDefault();
    if (e.keyCode == 38 && dir !== "down") dir = "up";
    else if (e.keyCode == 39 && dir !== "left") dir = "right";
    else if (e.keyCode == 40 && dir !== "up") dir = "down";
    else if (e.keyCode == 37 && dir !== "right") dir = "left";
  }
  

  function drawGame() {
    context.drawImage(fieldImg, 0, 0);
    context.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snakeArr.length; i++) {
        context.fillStyle = i === 0 ? "green" : "greenyellow";
        context.fillRect(snakeArr[i].x, snakeArr[i].y, box, box);
    }

    if (dir) {
        let newHead = { x: snakeArr[0].x, y: snakeArr[0].y };

        if (dir === "left") newHead.x -= box;
        if (dir === "right") newHead.x += box;
        if (dir === "up") newHead.y -= box;
        if (dir === "down") newHead.y += box;

        if (newHead.x === food.x && newHead.y === food.y) {
            score++;
            food = {
                x: Math.floor((Math.random() * 17) + 1) * box,
                y: Math.floor((Math.random() * 15) + 3) * box
            };
        } else {
            snakeArr.pop();
        }

        if (
            newHead.x < box ||
            newHead.x > 17 * box ||
            newHead.y < 3 * box ||
            newHead.y > 17 * box
        ) {
            endGame();
            return;
        }

        for (let i = 0; i < snakeArr.length; i++) {
            if (newHead.x === snakeArr[i].x && newHead.y === snakeArr[i].y) {
                endGame();
                return;
            }
        }

        snakeArr.unshift(newHead);
    }

    context.fillStyle = "white";
    context.font = "50px Arial";
    context.fillText(score, 2.5 * box, 1.7 * box);
}

function endGame() {
    clearInterval(game);
    restartBtn.classList.remove("hidden");
}

restartBtn.addEventListener("click", initGame);

initGame();