'use strict';

var L = require('leaflet');
require('date-fns');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var L__default = /*#__PURE__*/_interopDefaultLegacy(L);

/**
 * Sækja gögn frá
 * https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
 * 
 * sér í lagi, alla jarðskjálfta 4,5+ seinustu 7 daga:
 * https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
 * 
 * Ath, í verkefni er afrit af gögnum í `./4.5_week.geojson`, gott
 * að nota það á meðan þróun stendur en skipta svo út.
 */

const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
// const URL = './4.5_week.geojson';

async function fetchEarthquakes() {
  // TODO Sækja gögn frá URL, setja upp villumeðhöndlun og skila
  const ul = document.querySelector('.earthquakes');

  fetch(`${URL}`)
    .then((res) => res.json())
    .then((data) => {
      const earthquakes = data.features;
      return earthquakes.map((eq)=>{
        const li = document.createElement('li');
        ul.appendChild(li);
      });
    })
    .catch((error)=>{
      console.log(error);
    });
}

let map;

L__default['default'].geoJSON(data, {
  style: function (feature) {
    return {color: feature.properties.color};
  }
}).bindPopup(function(layer){
  return layer.feature.properties.description;
}).addTo(map);

// Býr til Leaflet kort og setur miðju á (0, 0) í zoom level 2
function init(el) {
  // TODO

  // Bætum við "tiles" frá OSM sem eru open source. Gætum líka
  // notað frá Google, mapbox eða fleirum en þyrftum þá aðgang
  
  const map = L__default['default'].map(document.querySelector('.map')).setView([0.0,0.0], 2);

  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L__default['default'].tileLayer(tileURL, { attribution });
  tiles.addTo(map);
  


  L__default['default'].tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);
}

// importa öðru sem þarf...

document.addEventListener('DOMContentLoaded', async () => {
  // Hér er allt „vírað“ saman
  fetchEarthquakes();
  init();
});
