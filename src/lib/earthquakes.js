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

export async function fetchEarthquakes() {
  // TODO Sækja gögn frá URL, setja upp villumeðhöndlun og skila
  const ul = document.querySelector('.earthquakes');

  fetch(`${URL}`)
    .then((res) => res.json())
    .then((data) => {
      const earthquakes = data.features;

      return earthquakes.map((eq)=> {
        const li = document.createElement('li');

        li.innerHTML += '<div>'
        li.innerHTML += '<h2>' + eq.properties.place + '</h2>'
        li.innerHTML += '<dl>'
        li.innerHTML += '<dt> Tími </dt>'
        li.innerHTML += '<dd>' + eq.properties.time + '</dd>'
        li.innerHTML += '<dt> Styrkur </dt>'
        li.innerHTML += '<dd>' + eq.properties.mag + ' á richter </dd>'
        li.innerHTML += '</dl>'
        li.innerHTML += '<div class="buttons"> <button>Sjá á korti</button>'
        li.innerHTML += '<a href="' + eq.properties.url + '" target="_blank">Skoða nánar</a>'
        li.innerHTML += '</div></div>' 

        ul.appendChild(li);
      });
    })
    .catch((error)=>{
      console.log(error);
    })
}