
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".team-slider");
  const items = slider.querySelectorAll(".team-slider__item");
  const prevBtn = slider.querySelector(".team-slider__arrow--left");
  const nextBtn = slider.querySelector(".team-slider__arrow--right");
  const dotsContainer = slider.querySelector(".team-slider__dots");

  let currentIndex = 0;

 
  items.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("button");

  function showSlide(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;

    items.forEach((item, i) => item.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));

    currentIndex = index;
  }

  prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));
});