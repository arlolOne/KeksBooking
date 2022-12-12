import * as map from './map.js';

function getRandomInt(min, max) {
  if (min < 0 || min >= max) {
    return 0;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.round(Math.random() * (max - min)) + min;
}

function getRandomFloat(min, max, accuracy) {
  if (min < 0 || min >= max) {
    return 0;
  }
  return (Math.random() * (max - min) + min).toFixed(accuracy);
}

function getNumWithZero(num, countChar) {
  let strNum = String(num);
  if (strNum.length < countChar) {
    return strNum.padStart(countChar, '0');
  }
  return strNum;
}

function getRandomOneItem(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getRandomManyItems(array) {
  let resultArr = array.filter(() => getRandomInt(0, 1));

  if (resultArr.length === 0) {
    resultArr.push(array[getRandomInt(0, array.length - 1)]);
  }
  return resultArr;
}

/* Изначально неповторяющиеся случайные числа с диапазона */
function createRandomer(min, max) {
  if (min < 0 || min >= max) {
    return 0;
  }

  let values = [];

  return function () {
    if (values.length === 0) {
      for (let i = 0; i <= max - min; i++) {
        values[i] = i + min;
      }
    }

    let begin = 0;
    let end = values.length - 1;
    let valueIndex = Math.round(Math.random() * (end - begin)) + begin;

    let value = values[valueIndex];
    values.splice(valueIndex, 1);
    return value;
  }
}

function resetMap() {
  map.map.remove();
  map.initializeMap();
}

function reloadState() {
  const adForm = document.querySelector('.ad-form');
  const mapForm = document.querySelector('.map__filters');
  adForm.reset();
  mapForm.reset();
  resetMap();
}

function showSuccess() {
  const successTemplate = document.querySelector('#success').content;
  const messageTemplate = successTemplate.cloneNode(true);
  const body = document.querySelector('body');
  body.appendChild(messageTemplate);

  document.addEventListener('click', function (evt) {
    hideMessage();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      hideMessage();
    }
  });

  function hideMessage() {
    if (body.querySelector('.success')) {
      reloadState();
      body.querySelector('.success').remove();
    }
  }
}

function showError() {
  const errorTemplate = document.querySelector('#error').content;
  const messageTemplate = errorTemplate.cloneNode(true);
  const body = document.querySelector('body');
  body.appendChild(messageTemplate);
  const errorButton = messageTemplate.querySelector('.error__button');

  document.addEventListener('click', function (evt) {
    if (body.querySelector('.error')) {
      body.querySelector('.error').remove();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      if (body.querySelector('.error')) {
        body.querySelector('.error').remove();
      }
    }
  });
}

export {
  getRandomInt,
  getRandomFloat,
  getNumWithZero,
  getRandomOneItem,
  getRandomManyItems,
  createRandomer,
  reloadState,
  showSuccess,
  showError
};
