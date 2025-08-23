function checkBiggestNumber() {
    const v1 = document.querySelector("#inp1").value.trim();
    const v2 = document.querySelector("#inp2").value.trim();
    const v3 = document.querySelector("#inp3").value.trim();
    const textEl = document.querySelector(".number__text");
    const numEl = document.getElementById("result223");

    const allNumbers = [v1, v2, v3].every(v => v !== "" && !Number.isNaN(Number(v)));

    if (!allNumbers) {
        textEl.textContent = "Будь ласка, введіть дійсні числа.";
        numEl.textContent = "";
        return;
    }

    const n1 = Number(v1);
    const n2 = Number(v2);
    const n3 = Number(v3);

    textEl.textContent = "Найбільше число, яке ви ввели -";
    numEl.textContent = Math.max(n1, n2, n3);
}

document.querySelectorAll(".number__input").forEach(input => {
    input.addEventListener("blur", checkBiggestNumber);
});
