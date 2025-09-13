const register = document.querySelector(".register"),
    closeBtn = document.querySelector(".register__close"),
    saveBtn = document.querySelector(".register__button"),
    input = document.querySelector(".register__input"),
    greeting = document.querySelector(".header__greetings");

function openModal() {
    register.classList.remove("backdrop-hidden");
    document.body.classList.add("no-scroll", "modal-open-bg");
}

function closeModal() {
    register.classList.add("backdrop-hidden");
    document.body.classList.remove("no-scroll", "modal-open-bg");
}

function saveName() {
    if (input.value.trim()) {
        greeting.textContent = `Вітаємо, ${input.value.trim()}!`;
        closeModal();
    }
}

closeBtn.addEventListener("click", closeModal);
saveBtn.addEventListener("click", saveName);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); 
        saveName();
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !register.classList.contains("backdrop-hidden")) {
        closeModal();
    }
});
openModal();