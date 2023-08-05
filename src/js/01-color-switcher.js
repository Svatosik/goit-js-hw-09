const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
let timerId = null;

function startColorChange() {
  if (timerId) return;
  startButton.disabled = true;
  stopButton.disabled = false;
  timerId = setInterval(changeBackgroundColor, 1000);
}

function stopColorChange() {
  if (!timerId) return;
  startButton.disabled = false;
  stopButton.disabled = true;
  clearInterval(timerId);
  timerId = null;
}

function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);
