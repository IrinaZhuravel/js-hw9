const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const body = document.querySelector("body");

let timerId = null;

const toggle = (run) => {
  startBtn.disabled = run;
  stopBtn.disabled = !run;
}

const startColorSwitch = () => {
toggle(true);


  timerId = setInterval(() => {
    const bgc = getRandomHexColor();
    body.style.backgroundColor = bgc;
  }, 1000);
};

const stopColorSwitch = () => {
clearInterval(timerId);
toggle(false);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener("click", startColorSwitch);
stopBtn.addEventListener('click', stopColorSwitch);

