const items = document.querySelectorAll('.team-slider__item');
const prevBtn = document.querySelector('.team-slider__arrow--left');
const nextBtn = document.querySelector('.team-slider__arrow--right');
const dotsContainer = document.querySelector('.team-slider__dots');

let currentIndex = 0;

items.forEach((_, index) => {
  const dot = document.createElement('span');
  if (index === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('span');

function updateSlider(index) {
  items.forEach(i => i.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  items[index].classList.add('active');
  dots[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateSlider(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateSlider(currentIndex);
});