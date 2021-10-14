import { createMenu } from './view/menu.js';
import { createRouteAndPrice } from './view/route-and-price.js';
import { createFilterTemplate } from './view/filter.js';
import { createSort } from './view/sort.js';
import { createTripList } from './view/trip-list.js';
import { createPointTemplate } from './view/point.js';
// import { createNewPoint } from './view/new-point.js';
import { createPointEditTemplate } from './view/point-edit.js';
import {generatePoint} from './mock/point.js';

const POINT_COUNT = 15;

const points = new Array(POINT_COUNT).fill(null).map(generatePoint);

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
render(tripFilter, createFilterTemplate(), 'beforeend');
render(tripEvent, createSort(), 'beforeend');
render(tripEvent, createTripList(), 'beforeend');

const tripEventList = pageMain.querySelector('.trip-events__list');

render(tripEventList, createPointEditTemplate(points[0]), 'beforeend');
// render(tripEventList, createNewPoint(), 'beforeend');

for (let i = 1; i < POINT_COUNT; i ++) {
  render(tripEventList, createPointTemplate(points[i]), 'beforeend');
}
