let type = document.querySelector('#type');
let price = document.querySelector('#price');
let timein = document.querySelector('#timein');
let timeout = document.querySelector('#timeout');
let roomNum = document.querySelector('#room_number');
let capacity = document.querySelector('#capacity');
let copyCapacity = capacity.querySelectorAll('option');

timein.addEventListener('change', () => {
  switch (timein.value) {
    case '12:00':
      timeout.value = '12:00';
      break;

    case '13:00':
      timeout.value = '13:00';
      break;

    case '14:00':
      timeout.value = '14:00';
      break;

    default:
      break;
  }
});

timeout.addEventListener('change', () => {
  switch (timeout.value) {
    case '12:00':
      timein.value = '12:00';
      break;

    case '13:00':
      timein.value = '13:00';
      break;

    case '14:00':
      timein.value = '14:00';
      break;

    default:
      break;
  }
});

type.addEventListener('change', () => {
  switch (type.value) {
    case 'bungalow':
      price.min = 0;
      price.placeholder = 0;
      break;

    case 'flat':
      price.min = 1000;
      price.placeholder = 1000;
      break;

    case 'house':
      price.min = 5000;
      price.placeholder = 5000;
      break;

    case 'palace':
      price.min = 10000;
      price.placeholder = 10000;
      break;

    default:
      break;
  }
});

roomNum.addEventListener('change', () => {
  let options = capacity.children;
  switch (roomNum.value) {
    case '1':
      updateOptions();
      options[0].remove();
      options[0].remove();
      options[1].remove();
      options[0].setAttribute('selected', '');
      break;

    case '2':
      updateOptions();
      options[0].remove();
      options[2].remove();
      options[0].setAttribute('selected', '');
      break;

    case '3':
      updateOptions();
      options[3].remove();
      options[0].setAttribute('selected', '');
      break;

    case '100':
      updateOptions();
      options[0].remove();
      options[0].remove();
      options[0].remove();
      break;

    default:
      break;
  }
});

function updateOptions() {
  copyCapacity[0].removeAttribute('selected');
  copyCapacity.forEach(option => {
    capacity.appendChild(option);
  });
}

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const fileUser = document.querySelector('#avatar');
const fileFlat = document.querySelector('#images');
const previewUser = document.querySelector('.ad-form-header__preview').children[0];
const previewFlat = document.querySelector('.ad-form__photo');
const flatImage = document.createElement('img');

fileUser.addEventListener('change', () => {
  let file = fileUser.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener('load', () => {
      previewUser.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

fileFlat.addEventListener('change', () => {
  let file = fileFlat.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener('load', () => {
      flatImage.src = reader.result;
      flatImage.width = '70';
      flatImage.height = '70';
    });

    reader.readAsDataURL(file);
  }
  previewFlat.appendChild(flatImage);
});

