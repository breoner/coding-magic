const input = document.getElementById('randomInput');
const button = document.getElementById('guessButton');
const result = document.getElementById('guessResult');

function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

let randomNumber = generateRandomNumber();

button.addEventListener('click', () => {
  const userGuess = parseInt(input.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    result.textContent = 'Будь ласка, введіть число від 1 до 10';
    result.style.color = 'red';
    return;
  }

  if (userGuess === randomNumber) {
    result.textContent = `Вітаю, ви вгадали число! (${randomNumber})`;
    result.style.color = 'green';
  } else {
    result.textContent = `Ви програли, комп’ютер загадав ${randomNumber})`;
    result.style.color = 'red';
  }

  input.value = '';
  randomNumber = generateRandomNumber();
});