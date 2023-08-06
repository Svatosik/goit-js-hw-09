import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function outputPromises(firstDelay, delayStep, amount) {
  for (let i = 1; i <= amount; i += 1) {
    const delay = firstDelay + (i - 1) * delayStep;
    createPromise(i, delay)
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
