import * as generator from './generator.js';
import * as ajax from './ajax.js';
import * as state from './state.js';

let map;

function initializeMap() {
  const address = document.querySelector('#address');

  state.inactiveState('all');

  map = L.map('map-canvas')
    .on('load', () => {
      state.activeState('add');
      address.value = `lat: 35.68950, lng: 139.69200`;
      createFlatsArray();
    })
    .setView({
      lat: 35.68950,
      lng: 139.69200,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  let mainPin = L.icon({
    iconUrl: 'leaflet/img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  let pin = L.icon({
    iconUrl: 'leaflet/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  let mainMarker = L.marker(
    {
      lat: 35.68950,
      lng: 139.69200,
    },
    {
      draggable: true,
      icon: mainPin,
    },
  ).addTo(map);

  mainMarker.on('moveend', (evt) => {
    let latlng = evt.target.getLatLng();

    address.value = `lat: ${latlng.lat.toFixed(5)}, lng: ${latlng.lng.toFixed(5)}`;
  });

  const mapForm = document.querySelector('.map__filters');
  mapForm.addEventListener('change', _.debounce(() => {
    markers.forEach(marker => {
      marker.remove();
    });
    flatsArray = [];
    createFlatsArray();
  }, 500));

  let flatsArray = [];
  let markers = [];
  function createFlatsArray() {
    ajax.getData(
      data => {
        data.forEach(flatData => {
          flatsArray.push(flatData);
        });
        addMarkers();
      },
      err => alert('Данные не были загружены, причина: \n' + err)
    );
  }

  function addMarkers() {

    let ranks = [];
    flatsArray.forEach(flat => {
      ranks.push(getRank(flat));
    });
    let ranksFilter = ranks.filter(rank => rank == Math.max(...ranks)).length;
    let countFlat = ranksFilter > 10 ? 10 : ranksFilter;

    flatsArray = flatsArray.sort((firstFlat, secondFlat) => {
      return getRank(secondFlat) - getRank(firstFlat);
    }).slice(0, countFlat);

    flatsArray.forEach(flat => {
      let markupFlat = generator.getMarkupFlat(flat);
      let marker = L.marker(
        {
          lat: flat.location.lat,
          lng: flat.location.lng,
        },
        {
          icon: pin,
        },
      ).addTo(map)
        .bindPopup(markupFlat);
      markers.push(marker);
    });
    if (flatsArray.length > 0) {
      state.activeState('map');
    }
  }

  function getRank(flat) {
    const housingType = document.querySelector('#housing-type').value;
    const housingPrice = document.querySelector('#housing-price').value;
    const housingRooms = document.querySelector('#housing-rooms').value;
    const housingGuests = document.querySelector('#housing-guests').value;

    const housingFeatures = document.querySelector('#housing-features').querySelectorAll('input');
    let selectedFeatures = [];
    for (let i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i]['checked']) {
        selectedFeatures.push(housingFeatures[i]['id'].split('-')[1]);
      }
    }

    let rank = 0;

    if (flat.offer.type == housingType) {
      rank += 4;
    }

    if (flat.offer.price < 10000 && housingPrice == 'low' ||
      flat.offer.price >= 10000 && flat.offer.price <= 50000 && housingPrice == 'middle' ||
      flat.offer.price > 50000 && housingPrice == 'high') {
      rank += 3;
    }

    if (flat.offer.rooms == housingRooms) {
      rank += 2;
    }

    if (flat.offer.guests == housingGuests) {
      rank += 2;
    }

    let currentFeatures = flat.offer.features;
    if (Array.isArray(currentFeatures)) {
      for (let i = 0; i < selectedFeatures.length; i++) {
        if (currentFeatures.includes(selectedFeatures[i])) {
          rank++;
        }
      }
    }

    return rank;
  }
}

export { map, initializeMap };
