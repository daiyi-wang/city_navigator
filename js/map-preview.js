import { cityMap } from './data/map.js';

const places = cityMap.places;
const roads = cityMap.roads;

const map = document.querySelector('#town-map');

const building = place => `
  <article class="building building--${place.form}" style="left:${place.x}%;top:${place.y}%;width:${place.w}%;height:${place.h}%;--accent:${place.color}" aria-label="${place.name}">
    <div class="building-art" aria-hidden="true">
      <span class="roof"></span>
      <span class="facade">
        <i></i><i></i><i></i><i></i>
        <b>${place.mark}</b>
      </span>
    </div>
    <strong>${place.name}</strong>
  </article>`;

const road = item => `<div class="street street--${item.axis}" style="--position:${item.position}%"><span>${item.label}</span></div>`;

map.innerHTML = `
  <div class="district district--northwest"></div>
  <div class="district district--north"></div>
  <div class="district district--northeast"></div>
  <div class="district district--west"></div>
  <div class="district district--center"></div>
  <div class="district district--east"></div>
  <div class="district district--southwest"><span class="lot-label">Community garden</span></div>
  <div class="district district--south"><span class="lot-label">Town square</span></div>
  <div class="district district--southeast"><span class="lot-label">Sports field</span></div>
  ${roads.map(road).join('')}
  <span class="crosswalk crosswalk--a" aria-hidden="true"></span>
  <span class="crosswalk crosswalk--b" aria-hidden="true"></span>
  <span class="traffic-light traffic-light--a" role="img" aria-label="Traffic light"><i></i><i></i><i></i></span>
  <span class="traffic-light traffic-light--b" role="img" aria-label="Traffic light"><i></i><i></i><i></i></span>
  <span class="traffic-light traffic-light--c" role="img" aria-label="Traffic light"><i></i><i></i><i></i></span>
  <span class="traffic-light traffic-light--d" role="img" aria-label="Traffic light"><i></i><i></i><i></i></span>
  <span class="bus-stop bus-stop--a" role="img" aria-label="Bus stop"><i></i><b>BUS</b></span>
  <span class="bus-stop bus-stop--b" role="img" aria-label="Bus stop"><i></i><b>BUS</b></span>
  ${places.map(building).join('')}
`;
