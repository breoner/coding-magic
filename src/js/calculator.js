const inputA = document.getElementById('js-input-a');
const inputB = document.getElementById('js-input-b');
const btnResult = document.getElementById('js-btn-result');
const output = document.getElementById('js-output');

const btnPlus = document.getElementById('plus');
const btnSubtract = document.getElementById('substract');
const btnMultiply = document.getElementById('multiplication');
const btnDivide = document.getElementById('division');

let selectedOperation = null;

function setActiveOperation(button) {

  [btnPlus, btnSubtract, btnMultiply, btnDivide].forEach(btn => {
    btn.classList.remove('calculator__btn--active');
  });

  button.classList.add('calculator__btn--active');

  selectedOperation = button.id;
}

btnPlus.addEventListener('click', () => setActiveOperation(btnPlus));
btnSubtract.addEventListener('click', () => setActiveOperation(btnSubtract));
btnMultiply.addEventListener('click', () => setActiveOperation(btnMultiply));
btnDivide.addEventListener('click', () => setActiveOperation(btnDivide));

function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'Не можна ділити на нуль';
  }
  return a / b;
}

function calculate(a, b, operation) {
  switch (operation) {
    case 'plus':
      return sum(a, b);
    case 'substract':
      return subtract(a, b);
    case 'multiplication':
      return multiply(a, b);
    case 'division':
      return divide(a, b);
    default:
      return 'Оберіть операцію';
  }
}

btnResult.addEventListener('click', () => {
  const a = Number(inputA.value);
  const b = Number(inputB.value);

  if (inputA.value === '' || inputB.value === '') {
    output.value = 'Введіть обидва числа';
    return;
  }

  if (isNaN(a) || isNaN(b)) {
    output.value = 'Введіть число';
    return;
  }

  if (!selectedOperation) {
    output.value = 'Оберіть операцію';
    return;
  }

  const result = calculate(a, b, selectedOperation);
  output.value = result;
});