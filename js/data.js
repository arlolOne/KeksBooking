import * as util from './util.js';

const flats = [
  {
    title: 'Аппартаменты класса люкс',
    description: 'Роскошные апартаменты люкс-класса в центре города с панорамным видом'
  },
  {
    title: 'Квартира премиум класса',
    description: 'Большая квартира в клубном доме в центре города с закрытым двором'
  },
  {
    title: 'Квартира стандарт класса',
    description: 'Квартира с хорошим ремонтом в 15 минутах от центра в новостройке'
  },
  {
    title: 'Квартира эконом класса',
    description: 'Маленькая, но уютная квартира в часе от центра в коммуналке'
  },
  {
    title: 'Комната в общаге',
    description: 'Койко-место с клопами в общаге для нищих за чертой города'
  }
];

const photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

const times = ['12:00', '13:00', '14:00'];

const types = ['palace', 'flat', 'house', 'bungalow'];

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function getRecordFlat() {
  let record = {
    author: {
      avatar: `img/avatars/user${util.getNumWithZero(util.getRandomInt(1, 8), 2)}.png`,
    },
    location: {
      x: util.getRandomFloat(35.65000, 35.70000, 5),
      y: util.getRandomFloat(139.70000, 139.80000, 5)
    },
    offer: {
      title: '',
      address: '',
      price: util.getRandomInt(1000, 10000),
      type: util.getRandomOneItem(types),
      rooms: util.getRandomInt(1, 10),
      guests: util.getRandomInt(2, 20),
      checkin: util.getRandomOneItem(times),
      checkout: util.getRandomOneItem(times),
      features: util.getRandomManyItems(features),
      description: '',
      photos: util.getRandomManyItems(photos)
    }
  };

  record.offer.address = record.location.x + ', ' + record.location.y;
  let flat = util.getRandomOneItem(flats);
  record.offer.title = flat['title'];
  record.offer.description = flat['description'];

  return record;
}

export { getRecordFlat };
