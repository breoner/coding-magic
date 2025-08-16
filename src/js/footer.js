const formEl = document.querySelector(".footer__form");
const backdropEl = document.querySelector(".backdrop");
const closeBtn = document.querySelector(".backdrop__btn");

formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    backdropEl.classList.remove("is-hidden");
});

closeBtn.addEventListener("click", function () {
    backdropEl.classList.add("is-hidden");
});

backdropEl.addEventListener("click", function (event) {
    if (event.target === backdropEl) {
        backdropEl.classList.add("is-hidden");
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        backdropEl.classList.add("is-hidden");
    }
});