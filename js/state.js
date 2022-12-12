import * as util from './util.js';

const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const resetButton = adForm.querySelector('.ad-form__reset');

function inactiveState(target) {
  if (target === 'add' || target === 'all') {
    adForm.classList.add('ad-form--disabled');
    for (const item of adForm.children) {
      item.disabled = 'true';
    }
  }

  if (target === 'map' || target === 'all') {
    mapForm.classList.add('ad-form--disabled');
    for (const item of mapForm.children) {
      item.disabled = 'true';
    }
  }
}

function activeState(target) {

  if (target === 'add' || target === 'all') {
    adForm.classList.remove('ad-form--disabled');
    for (const item of adForm.children) {
      item.removeAttribute('disabled');
    }
  }

  if (target === 'map' || target === 'all') {
    mapForm.classList.remove('ad-form--disabled');
    for (const item of mapForm.children) {
      item.removeAttribute('disabled');
    }
  }
}

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  util.reloadState();
});

export { inactiveState, activeState };
