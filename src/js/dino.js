const dino = document.querySelector('.dino__dino');
const gameArea = document.querySelector('.dino__game');
const cactus = document.querySelector('.dino__cactus');
const startBtn = document.querySelector('.dino__start');
const dinoText = document.querySelector('.dino__text');
const pointsDisplay = document.querySelector('#points');

let isJumping = false;
let isGameOver = false;
let isGameStarted = false;
let points = 0;
let pointsInterval;

const jumpSound = new Audio('jump.mp3');
const gameOverSound = new Audio('gameover.mp3');

startBtn.addEventListener('click', startGame);

document.addEventListener('keydown', e => {
  if (e.code === 'Space' && !isJumping && !isGameOver) {
    e.preventDefault();
    jump();
  }
});

function startGame() {
  if (isGameStarted) return;

  isGameStarted = true;
  isGameOver = false;
  points = 0;
  pointsDisplay.textContent = points.toString().padStart(5, '0');
  dinoText.textContent = '';

  cactus.style.right = '-50px';
  cactus.style.transform = 'scale(2)';
  cactus.style.animation = 'cactusMove 1.5s linear infinite';
  gameArea.classList.add('ground-animate');

  startPoints();
  checkCollision();
}

let isWaiting = false;

function startPoints() {
  clearInterval(pointsInterval);

  pointsInterval = setInterval(() => {
    if (isGameOver || isWaiting) return; // полностью замораживаем

    // Проверка: если текущее значение кратно 100, запускаем моргание
    if ((points + 1) % 100 === 0) { 
      points += 1;
      pointsDisplay.textContent = points.toString().padStart(5, '0');

      // Моргание
      pointsDisplay.classList.remove('blink');
      void pointsDisplay.offsetWidth;
      pointsDisplay.classList.add('blink');

      // Заморозка на время моргания: 4 моргания по 0.1s = 0.4s
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
      }, 400);

    } else {
      points += 1;
      pointsDisplay.textContent = points.toString().padStart(5, '0');
    }
  }, 50);
}

function jump() {
  if (isJumping) return;
  isJumping = true;
  dino.classList.add('jump');
  jumpSound.play();

  setTimeout(() => {
    dino.classList.remove('jump');
    isJumping = false;
  }, 650);
}

function checkCollision() {
  const gameLoop = setInterval(() => {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
      dinoRect.right > cactusRect.left &&
      dinoRect.left < cactusRect.right &&
      dinoRect.bottom > cactusRect.top
    ) {
      isGameOver = true;
      isGameStarted = false;
      clearInterval(pointsInterval);
      cactus.style.animation = 'none';
      gameArea.classList.remove('ground-animate');
      gameOverSound.play();
      dinoText.textContent =
        "Гру закінчено! Натисни 'Старт', щоб почати знову.";
    }
  }, 10);
}
