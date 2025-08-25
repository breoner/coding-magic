const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  if (body.getAttribute('data-theme') === 'dark') {
    body.removeAttribute('data-theme');
    themeToggle.textContent = '🌞';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }
});
