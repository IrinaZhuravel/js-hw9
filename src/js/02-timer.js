import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector("[data-start]");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

startBtn.disabled = true;
let selectedDate;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!selectedDates[0] || selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
    selectedDate = selectedDates[0];
  },
};

const timer = () => {
 
  let counter = selectedDate - new Date();
  startBtn.disabled = true;

  timerId = setInterval(() => {
    const currentDate = new Date (); // update current time 
    counter = selectedDate - currentDate;
    const update = convertMs(counter);
    days.textContent = addLeadingZero(update.days);
    hours.textContent = addLeadingZero(update.hours);
    minutes.textContent = addLeadingZero(update.minutes);
    seconds.textContent = addLeadingZero(update.seconds);

    if (counter <= 0) { //stop timer
      clearInterval(timerId);
      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";
      Notiflix.Notify.success("Time is up");
      return;
    }
  }, 1000);
};

const addLeadingZero = (value) => value.toString().padStart(2, "0");

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr("#datetime-picker", options);
startBtn.addEventListener("click", timer);

