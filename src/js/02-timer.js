import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTime = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('button[data-start]')
const days = document.querySelector('.value[data-days]')
const hours = document.querySelector('.value[data-hours]')
const minutes = document.querySelector('.value[data-minutes]')
const seconds = document.querySelector('.value[data-seconds]')
const timerStyle = document.querySelector('.timer')
const fieldStyle = document.querySelectorAll('.field')
const valueStyle = document.querySelectorAll('.value')
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] > fp.now) {
          startBtn.removeAttribute("disabled")
      } else {
          Notiflix.Report.failure('Error!!!', 'Please choose a date in the future', 'OK');
      }
  },
};
const fp = flatpickr(dateTime, options);
let timerId = null
let ms = 0

addStyle()

startBtn.setAttribute("disabled", true)
startBtn.addEventListener("click", onStartCountdown)

function onStartCountdown() {
    timerId = setInterval(() => {
        ms = Date.parse(fp.selectedDates[0]) - Date.now()
        days.textContent = addLeadingZero(`${convertMs(ms).days}`)
        hours.textContent = addLeadingZero(`${convertMs(ms).hours}`)
        minutes.textContent = addLeadingZero(`${convertMs(ms).minutes}`)
        seconds.textContent = addLeadingZero(`${convertMs(ms).seconds}`)
        if (ms <= 1000) {
            clearInterval(timerId)
            Notiflix.Report.success('Finish!', 'Timer to finish!!!', 'OK');
        }
    }, 1000)
}

function convertMs(ms) {
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

function addLeadingZero(value) {
   return value.padStart(2, "0")  
}

function addStyle() {
    timerStyle.style = `  
        margin-top: 10px;
        display: flex;` 
    for (const el of fieldStyle) {
    el.style = `  
        font-weight: 500;
        display: grid;
        text-transform: uppercase;
        padding: 5px;
        text-align: center;` 
    }
    for (const el of valueStyle) {
    el.style = `  
        font-size: 30px` 
    }
}