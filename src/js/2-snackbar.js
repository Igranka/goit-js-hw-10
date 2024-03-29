import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const delay = event.currentTarget.elements.delay.value;
    const state = event.currentTarget.elements.state.value;

    if (delay > 0) {

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === 'fulfilled') {
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay);
        });

        promise
            .then(value => {
                iziToast.show({
                    color: '#59A10D',
                    progressBarColor: '#326101',
                    messageColor: '#FFFFFF',
                    message: `✅ Fulfilled promise in ${delay}ms`,
                    position: 'topRight',
                })
            })
            .catch(error => {
                iziToast.show({
                    color: '#EF4040',
                    progressBarColor: 'rgb(181, 27, 27)',
                    messageColor: '#FFFFFF',
                    message: `❌ Rejected promise in ${delay}ms`,
                    position: 'topRight',
                });
            });
    } else {
        iziToast.show({
            color: '#FFA000',
            progressBarColor: '#FFA000',
            messageColor: '#FFFFFF',
            message: `Please enter a valid value`,
            position: 'topRight',
        });
    }
})