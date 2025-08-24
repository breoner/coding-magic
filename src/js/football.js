const field = document.getElementById("field");
const ball = document.getElementById("ball");
const goal = document.getElementById("goal");
const scoreEl = document.getElementById("score");

let score = 0;


const startX = 10;
const startY = field.clientHeight / 2 - ball.clientHeight / 2;
ball.style.left = startX + "px";
ball.style.top = startY + "px";

field.onclick = function(event) {
  let fieldCoords = this.getBoundingClientRect();

  let ballCoords = {
    top: event.clientY - fieldCoords.top - field.clientTop - ball.clientHeight / 2,
    left: event.clientX - fieldCoords.left - field.clientLeft - ball.clientWidth / 2
  };

  if (ballCoords.top < 0) ballCoords.top = 0;
  if (ballCoords.left < 0) ballCoords.left = 0;
  if (ballCoords.left + ball.clientWidth > field.clientWidth) {
    ballCoords.left = field.clientWidth - ball.clientWidth;
  }
  if (ballCoords.top + ball.clientHeight > field.clientHeight) {
    ballCoords.top = field.clientHeight - ball.clientHeight;
  }

  ball.style.left = ballCoords.left + "px";
  ball.style.top = ballCoords.top + "px";

  checkGoal();
};

function checkGoal() {
  const ballRect = ball.getBoundingClientRect();
  const goalRect = goal.getBoundingClientRect();

  
  if (
    ballRect.right >= goalRect.left &&
    ballRect.left <= goalRect.right &&
    ballRect.bottom >= goalRect.top &&
    ballRect.top <= goalRect.bottom
  ) {
    score++;
    scoreEl.textContent = score;


    setTimeout(() => {
      ball.style.left = startX + "px";
      ball.style.top = startY + "px";
    }, 100);
  }
}

