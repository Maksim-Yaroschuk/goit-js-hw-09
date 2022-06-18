const startBtn = document.querySelector("button[data-start]")
const stopBtn = document.querySelector("button[data-stop]")
const body = document.querySelector("body")
let timerId = null

stopBtn.setAttribute("disabled", true)
startBtn.addEventListener('click', onStartChangesBgColor)
stopBtn.addEventListener('click', onStopChangesBgColor)

function onStartChangesBgColor() {
  timerId = setInterval(() => {
  body.style = `background-color: ${getRandomHexColor()}`
  }, 1000)
  startBtn.setAttribute("disabled", true)
  stopBtn.removeAttribute("disabled")
}

function onStopChangesBgColor() {
  clearInterval(timerId)
  stopBtn.setAttribute("disabled", true)
  startBtn.removeAttribute("disabled")
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

