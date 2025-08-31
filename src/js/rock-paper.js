const choices = ['rock', 'scissors', 'paper'];
const resultText = document.getElementById('resultText');
const compScoreEl = document.getElementById('compScore');
const userScoreEl = document.getElementById('userScore');

let compScore = 0;
let userScore = 0;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(userChoice) {
  const computerChoice = getComputerChoice();

  if (userChoice === computerChoice) {
    resultText.textContent = `Нічия! Ви обрали ${userChoice}, комп’ютер теж ${computerChoice}`;
    return;
  }

  if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'scissors' && computerChoice === 'paper') ||
    (userChoice === 'paper' && computerChoice === 'rock')
  ) {
    userScore++;
    userScoreEl.textContent = userScore;
    resultText.textContent = `Ви виграли раунд! ${userChoice} б’є ${computerChoice}`;
  } else {
    compScore++;
    compScoreEl.textContent = compScore;
    resultText.textContent = `Комп’ютер виграв раунд! ${computerChoice} б’є ${userChoice}`;
  }
}

document.querySelectorAll('.rps__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const userChoice = btn.dataset.choice;
    playRound(userChoice);
  });
});
