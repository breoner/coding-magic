const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function setTheme(theme) {
  if (theme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '🌙';
  } else {
    body.removeAttribute('data-theme');
    themeToggle.textContent = '🌞';
  }
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const newTheme =
    body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});
