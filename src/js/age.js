const yearInput = document.getElementById("ageInput");
const resultText = document.getElementById("result");
const checkButton = document.getElementById("checkButton");
function checkLeapYear() {
    const year = yearInput.value.trim();
    const isValidYear = /^\d{4}$/.test(year);
    if (!isValidYear) {
        resultText.textContent = "Будь ласка, введіть 4-значний рік!";
        resultText.style.color = "red";
        return;
    }
    const numYear = parseInt(year);
    const isLeap = (numYear % 4 === 0 && numYear % 100 !== 0) || numYear % 400 === 0;
    if (isLeap) {
        resultText.textContent = "Ви народилися у високосний рік!";
        resultText.style.color = "green";
    } else {
        resultText.textContent = "Ви народилися не у високосний рік!";
        resultText.style.color = "red";
    }
    yearInput.value = "";
}
checkButton.addEventListener("click", checkLeapYear);
yearInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkLeapYear();
    }
});