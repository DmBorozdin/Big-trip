import { createMenu } from './view/menu.js';
import { createRouteAndPrice } from './view/route-and-price.js';
import { createFilter } from './view/filter.js';
import { createSort } from './view/sort.js';
import { createTripList } from './view/trip-list.js';
import { createPoint } from './view/point.js';
import { createNewPoint } from './view/new-point.js';
import { createPointEdit } from './view/point-edit.js';
// import {generatePoint} from './mock/point.js';

const TRIP_COUNT = 3;

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripFilter = pageHeader.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvent = pageMain.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripNavigation, createMenu(), 'beforeend');
render(tripMain, createRouteAndPrice(), 'afterbegin');
render(tripFilter, createFilter(), 'beforeend');
render(tripEvent, createSort(), 'beforeend');
render(tripEvent, createTripList(), 'beforeend');

const tripEventList = pageMain.querySelector('.trip-events__list');

render(tripEventList, createPointEdit(), 'beforeend');
render(tripEventList, createNewPoint(), 'beforeend');

for (let i = 0; i < TRIP_COUNT; i ++) {
  render(tripEventList, createPoint(), 'beforeend');
}
