const timeInput = document.querySelector("#time-input");
const timeButton = document.querySelector("#time-button");
const timeText = document.querySelector("#time-text");

function calculateTime() {
    let totalSeconds = parseInt(timeInput.value, 10);
    if (isNaN(totalSeconds) || totalSeconds < 0) {
        timeText.textContent = "Введіть число";
        return;
    }
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    timeText.textContent = `${days} дн. ${hours}:${minutes}:${seconds}`;
}

timeButton.addEventListener("click", calculateTime);
timeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        calculateTime();
    }
});