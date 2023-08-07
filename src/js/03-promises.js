import Notiflix from 'notiflix'; // імпортується бібліотека сповіщень notiflix

const form = document.querySelector('.form'); // змінна form ініціаліується формою з класом form

function createPromise(position, delay) {
  //декларація функції createPromise, яка бере два аргументи position, delay
  return new Promise((resolve, reject) => {
    // функція повертає проміс, який виконується в залежності від рандомного числа
    const shouldResolve = Math.random() > 0.3; // змінна shouldResolve, яка може бути або тру, або фолс, в залежності від того, чи рандомне число буде менше,або більше за 0.3
    setTimeout(() => {
      if (shouldResolve) {
        // перевірка shouldResolve, в залежності від змінної повертає різні результати промісів
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function outputPromises(firstDelay, delayStep, amount) {
  //декларація функції createPromise, яка бере два аргументи firstDelay, delayStep,amount
  for (let i = 1; i <= amount; i += 1) {
    // фором проходимося по кількості промісів
    const delay = firstDelay + (i - 1) * delayStep; // змінна delay ініціалізується вирахуванням затримки
    createPromise(i, delay) //використовується функція, яка створює проміс і в залежності від результату проміса виконується зен, а при помилці виконується кетч(кетч ловить помилки в промісах)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

form.addEventListener('submit', event => {
  // відслідковується підтвердження форми(потрібно вибрати значення і натиснути кнопочку) і після цього виконується функція, яка записує основні аргументи, перевіряє чи задовільняють вони поставлену умову, при умпішній перевірці виконує функцію outputPromises(firstDelay, delayStep, amount) , при неуспішній перевірці за допомогою бібліотеки Notiflix виводить помилку
  event.preventDefault();
  const firstDelay = Number(form.elements.delay.value);
  const delayStep = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  if (firstDelay < 0 || delayStep < 0 || amount <= 0) {
    Notiflix.Notify.warning(
      'Please enter a value not less than 0 for first delay, delay step and greater than 0 for amount'
    );
    return;
  }
  outputPromises(firstDelay, delayStep, amount);
});
