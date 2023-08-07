const startButton = document.querySelector('[data-start]'); //змінна startButton ініціалізується, як кнопка з тегом data-start
const stopButton = document.querySelector('[data-stop]'); //змінна stopButton ініціалізується, як кнопка з тегом data-stop
let timerId = null; //змінна timerId, ініціалізована нулл, створена для декларування , а в подальшому очищення, інтервалу

function startColorChange() {
  // декларація безаргументової функції  startColorChange
  if (timerId) return; // переверіка на timerId, якщо timerId має значення , то функція не виконується
  startButton.disabled = true; // кнопка startButton стає неклікабельною
  stopButton.disabled = false; // кнопка stopButton стає клікабельною
  timerId = setInterval(changeBackgroundColor, 1000); // в змінну timerId записується інтервал, який виконує функцію раз changeBackgroundColor в 1000 мс
}

function stopColorChange() {
  // декларація безаргументової функції  stopColorChange
  if (!timerId) return; // переверіка на timerId, якщо timerId не має значення , то функція не виконується
  startButton.disabled = false; // кнопка startButton стає клікабельною
  stopButton.disabled = true; // кнопка stopButton стає неклікабельною
  clearInterval(timerId); // закінцує (очищує) інтервал,який був у змінній timerId
  timerId = null; // змінні timerId присвоюється значення null
}

function changeBackgroundColor() {
  // декларація безаргументової функції  changeBackgroundColor
  document.body.style.backgroundColor = getRandomHexColor(); // дана функція міняє колір беку для баді використовючи для цього значення з функції getRandomHexColor
}

function getRandomHexColor() {
  // декларація безаргументової функції  getRandomHexColor
  return `#${Math.floor(Math.random() * 16777215) // ця функція повертає рядок рандомних чисел і літер, які задовільняють поставлену умову
    .toString(16)
    .padStart(6, '0')}`;
}

startButton.addEventListener('click', startColorChange);//startButton відслідковує click по кнопці, коли на кнопку клікнули виконує функцію startColorChange
stopButton.addEventListener('click', stopColorChange);//stopButton відслідковує click по кнопці, коли на кнопку клікнули виконує функцію stopColorChange
