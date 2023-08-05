import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputTimer = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let timerId = null;
let userTime = null;

function timeConverter(ms) {
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

const addZero = value => String(value).padStart(2, 0);

const options = {
  defaultDate: new Date(),
  enableTime: true,
  minuteIncrement: 1,
  time_24hr: true,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      userTime = selectedDates[0];
    }
    startButton.removeAttribute('disabled');

    const onClick = () => {
      startButton.setAttribute('disabled', true);
      inputTimer.setAttribute('disabled', true);
      if (timerId) {
        clearInterval(timerId);
      }
      showTimer();
      timerId = setInterval(showTimer, 1000);
    };
    startButton.addEventListener('click', onClick);
  },
};

const showTimer = () => {
  const now = new Date();
  if (!userTime) return;

  const diff = userTime - now;
  const { days, hours, minutes, seconds } = timeConverter(diff);
  daysElement.textContent = addZero(days);
  hoursElement.textContent = addZero(hours);
  minutesElement.textContent = addZero(minutes);
  secondsElement.textContent = addZero(seconds);

  if (
    daysElement.textContent === '00' &&
    hoursElement.textContent === '00' &&
    minutesElement.textContent === '00' &&
    secondsElement.textContent === '00'
  ) {
    clearInterval(timerId);
    inputTimer.removeAttribute('disabled');
  }
};

startButton.setAttribute('disabled', true);
flatpickr('#datetime-picker', { ...options });
