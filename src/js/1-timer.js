import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let futureIndicator;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates = selectedDates[0];
    futureIndicator = selectedDates - new Date();
    if (futureIndicator < 0) {
        iziToast.show({
            color: '#EF4040',
            progressBarColor: 'rgb(181, 27, 27)',
            messageColor: '#FFFFFF',
            message: 'Please choose a date in the future',
            position: 'topRight',
        });
        buttonInput.disabled = true;
        buttonInput.classList.remove(`is-active`);
        dateInput.classList.add(`is-disabled`);
    } else {
        userSelectedDate = selectedDates;
        buttonInput.disabled = false;
        buttonInput.classList.add(`is-active`);
        dateInput.classList.remove(`is-disabled`);
    }
  },
};

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

const datePicker = flatpickr("#datetime-picker", options);
const dateInput = document.querySelector('#datetime-picker');
const buttonInput = document.querySelector('button');
const timerElements = document.querySelectorAll('.value');

console.log(timerElements);

buttonInput.disabled = true;

buttonInput.addEventListener('click', event => {
    function timer() {
        futureIndicator = userSelectedDate - new Date();
        if (futureIndicator > 0) {
            const timer = convertMs(futureIndicator);
            timerElements[0].innerText = timer.days.toString().padStart(2, '0');
            timerElements[1].innerText = timer.hours.toString().padStart(2, '0');
            timerElements[2].innerText = timer.minutes.toString().padStart(2, '0');
            timerElements[3].innerText = timer.seconds.toString().padStart(2, '0');
        }
    }
    const interval = setInterval(timer, 999);
});

