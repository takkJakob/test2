import L from 'leaflet';

let map;

// Býr til popup á korti út frá geojson með content
export function createPopup(geojson, content) {
  L.popup()
    .setLatLng(geojson.properties.place)
    .setContent(content)
    .openOn(map);
}

/*
L.geoJSON({
  style: function (feature) {
    return {color: feature.properties.color};
  }
}).bindPopup(function(layer){
  return layer.feature.properties.description;
}).addTo(map);
*/


// Býr til Leaflet kort og setur miðju á (0, 0) í zoom level 2
export function init(el) {
  // TODO
  // Bætum við "tiles" frá OSM sem eru open source. Gætum líka
  // notað frá Google, mapbox eða fleirum en þyrftum þá aðgang
  
  const map = L.map(document.querySelector('.map')).setView([0.0,0.0], 2);

  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileURL, { attribution })
  tiles.addTo(map);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);
}
