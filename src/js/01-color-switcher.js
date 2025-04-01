const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const body = document.querySelector("body");

let timerId = null;

const startColorSwitch = () => {
  if (timerId) return;
  startBtn.setAttribute("disabled", "true");
  stopBtn.removeAttribute("disabled");

  timerId = setInterval(() => {
    const bgc = getRandomHexColor();
    body.style.backgroundColor = bgc;
  }, 1000);
};

const stopColorSwitch = () => {
clearInterval(timerId);
startBtn.removeAttribute("disabled");
stopBtn.setAttribute("disabled", "true");
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener("click", startColorSwitch);
stopBtn.addEventListener('click', stopColorSwitch);

