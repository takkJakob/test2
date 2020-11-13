import { fetchEarthquakes } from './lib/earthquakes.js';
import { init, createPopup } from './lib/map.js';
import { el, element, formatDate } from './lib/utils.js';
// importa öðru sem þarf...

document.addEventListener('DOMContentLoaded', async () => {
  // Hér er allt „vírað“ saman

  fetchEarthquakes();
  init();

});