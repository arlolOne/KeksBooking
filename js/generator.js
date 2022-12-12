import * as data from './data.js';

function getMarkupFlat(flat) {
  const cardTemplate = document.querySelector('#card').content;
  const flatCard = cardTemplate.cloneNode(true);

  let type = '';
  switch (flat.offer.type) {
    case 'flat':
      type = 'Квартира';
      break;

    case 'bungalow':
      type = 'Бунгало';
      break;

    case 'house':
      type = 'Дом';
      break;

    case 'palace':
      type = 'Дворец';
      break;

    default:
      break;
  }

  flatCard.querySelector('.popup__title').textContent = flat.offer.title;
  flatCard.querySelector('.popup__text--address').textContent = flat.offer.address;
  flatCard.querySelector('.popup__text--price').textContent = `${flat.offer.price} ₽/ночь`;
  flatCard.querySelector('.popup__text--capacity').textContent = `${flat.offer.rooms} комнаты для ${flat.offer.guests} гостей`;
  flatCard.querySelector('.popup__text--time').textContent = `Заезд после ${flat.offer.checkin}, выезд до ${flat.offer.checkout}`;
  flatCard.querySelector('.popup__description').textContent = flat.offer.description;
  flatCard.querySelector('.popup__avatar').src = flat.author.avatar;

  flatCard.querySelector('.popup__type').textContent = type;
  const features = flatCard.querySelector('.popup__features');
  features.textContent = '';
  if (Array.isArray(flat.offer.features)) {
    flat.offer.features.forEach(feature => {
      let featureClass = 'popup__feature--' + feature;
      const oneFeature = document.createElement('li');
      oneFeature.classList.add('popup__feature');
      oneFeature.classList.add(featureClass);
      features.appendChild(oneFeature);
    });
  }

  const photos = flatCard.querySelector('.popup__photos');
  photos.textContent = '';
  if (Array.isArray(flat.offer.photos)) {
    flat.offer.photos.forEach(photoUrl => {
      const photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = photoUrl;
      photo.alt = flat.offer.title;
      photo.width = '45';
      photo.height = '40';
      photos.appendChild(photo);
    });
  }
  return flatCard.querySelector('.popup');
}

export { getMarkupFlat };
