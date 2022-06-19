import Notiflix from 'notiflix';

const form = document.querySelector(".form")

form.addEventListener("submit", onSubmitForm)

function onSubmitForm(event) {
  event.preventDefault()
  const { delay, step, amount } = event.target.elements
  let delayStep = Number(delay.value)
for (let i = 0; i < amount.value; i+=1) {
createPromise(i, delayStep)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  delayStep += Number(step.value)
  }
  form.reset() 
}

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
  if (shouldResolve) {
    resolve({position, delay})
  } else {
    reject({position, delay})
  }
  }, delay)
  }
  )
}
