import flatpickr from 'flatpickr';// імпортується бібліотека flatpickr, яка використовується для створення календаря 
import 'flatpickr/dist/flatpickr.min.css';// імпортуються стилі для бібліотеки flatpickr
import Notiflix from 'notiflix';// імпортується бібліотека Notiflix для сповіщень 

const inputTimer = document.querySelector('#datetime-picker');//  змінна inputTime ініціалізується інпутом(календар) з ід datetime-picker
const startButton = document.querySelector('[data-start]');// змінна startButton ініціалізується кнопкою з тегом data-start
const daysElement = document.querySelector('[data-days]');// змінна daysElement ініціалізується спаном з тегом data-days
const hoursElement = document.querySelector('[data-hours]');// змінна hoursElement ініціалізується спаном з тегом data-hours
const minutesElement = document.querySelector('[data-minutes]');// змінна minutesElement ініціалізується спаном з тегом data-minutes
const secondsElement = document.querySelector('[data-seconds]');// змінна secondsElement ініціалізується спаном з тегом data-seconds

let timerId = null; // змінна  timerId ініціалзується значенням null, використовується для інтервалу
let userTime = null; // змінна  userTime ініціалзується значенням null, використовується для підрахунку часу, який пострібно відрахувати

function timeConverter(ms) {
  // функція timeConverter, яка приймає аргументом число і віддає об'єкт { days, hours, minutes, seconds }
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addZero = value => String(value).padStart(2, 0); // декларація і дефініювання функції addZero, яка приймає аргументом число і у випадку ,коли число дорівнює натуральному додає 0, повертаючи рядок 0value

const options = {
  //налаштування календаря за допомогою бібліотеки flatpickr
  defaultDate: new Date(),
  enableTime: true,
  minuteIncrement: 1,
  time_24hr: true,
  onClose(selectedDates) {
    //функція onClose бере аргуметом selectedDates, яка виконується при вибранні дати
    if (selectedDates[0] < new Date()) {
      // перевірка дати, чи є вибарана дата , більша за теперішню дату(по тз дата має бути в майбутньому)
      Notiflix.Notify.failure('Please choose a date in the future'); // використовуючи бібліотеку сповіщень Notiflix, виводимо помилку
      return;
    } else {
      userTime = selectedDates[0]; // в змінну userTime заисуємо вибрану змінну
    }
    startButton.removeAttribute('disabled'); // забираємо з кнопки стиль(атрибут) disabled, тобто робимо її клікабельною

    const onClick = () => {
      // декларація безаргументової функції onClick, виконується при кліку на кнопочку
      startButton.setAttribute('disabled', true); // startButton стає неклікабельним
      inputTimer.setAttribute('disabled', true); // inputTimer стає нелікабельним
      if (timerId) {
        // перевірка чи був ініціалізований таймер раніше
        clearInterval(timerId); // якщо так, то очищуємо інтервал з змінною timerId
      }
      showTimer(); // викликає безаргуметову функцію showTimer
      timerId = setInterval(showTimer, 1000); // створюємо інтервал,в якому виконується функція showTimer раз в 1000 мс, і записуємо в timerId
    };
    startButton.addEventListener('click', onClick); // відслідковує click по кнопці startButton і виконує безаргуметову функцію onClick
  },
};

const showTimer = () => {
  // декларація безаргументової функції showTimer
  const now = new Date(); //  змінна now ініціалізується ініціалізується теперішньою датою в мс
  if (!userTime) return; // перевірка чи дата вибрана, якщо ні, то функція закінчується

  const diff = userTime - now; // змінна diff рахується за допомогою  різниці userTime і now
  const { days, hours, minutes, seconds } = timeConverter(diff); // ініціалізується об'єкт значенням з функції timeConverter аргуметом, якої є diff(функція повертає об'єкт)
  daysElement.textContent = addZero(days); // в спан daysElement записується рядок, який повертається з функції addZero аргуметом, якої є days
  hoursElement.textContent = addZero(hours); // в спан hoursElement записується рядок, який повертається з функції addZero аргуметом, якої є hours
  minutesElement.textContent = addZero(minutes); // в спан minutesElement записується рядок, який повертається з функції addZero аргуметом, якої є minutes
  secondsElement.textContent = addZero(seconds); // в спан secondsElement записується рядок, який повертається з функції addZero аргуметом, якої є seconds

  if ( // перевірка на закінчення таймера
    daysElement.textContent === '00' &&
    hoursElement.textContent === '00' &&
    minutesElement.textContent === '00' &&
    secondsElement.textContent === '00'
  ) {
    clearInterval(timerId); // очищення інтервалу timerId
    inputTimer.removeAttribute('disabled'); // inputTimer стає клікабельним
  }
};

startButton.setAttribute('disabled', true); // startButton стає неклікабельним 
flatpickr('#datetime-picker', { ...options }); // створення каледарика за допомогою бібліотеки flatpickr опираючись на options
