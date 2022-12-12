import * as state from './state.js';
import * as util from './util.js';

function getData(throwData, showError) {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((json) => {
      throwData(json);
    })
    .catch((err) => {
      state.inactiveState('map');
      showError(err);
    });
};

const adForm = document.querySelector('.ad-form');
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  sendData(
    () => util.showSuccess(),
    () => util.showError(),
    formData
  );
});

function sendData(showSuccess, showError, body) {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        showSuccess();
      } else {
        showError();
      }
    })
    .catch(() => {
      showError();
    });
};

export { getData };
