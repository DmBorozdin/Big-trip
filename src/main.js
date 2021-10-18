import { isDay1AfterDay2 } from './util.js';

import { createMenuTemplate } from './view/menu.js';
import { createRouteTemplate } from './view/route.js';
import { createPriceTemplate } from './view/price.js';
import { createFilterTemplate } from './view/filter.js';
import { createSortTempalte } from './view/sort.js';
import { createTripListTemplate } from './view/trip-list.js';
import { createPointTemplate } from './view/point.js';
// import { createNewPoint } from './view/new-point.js';
import { createPointEditTemplate } from './view/point-edit.js';
import { generatePoint } from './mock/point.js';
// import { generateFilter } from './mock/filter.js';

const POINT_COUNT = 10;

const points = new Array(POINT_COUNT).fill(null).map(generatePoint);
const daySortPoints = points.slice().sort((point1, point2) =>  isDay1AfterDay2(point1.dateFrom, point2.dateFrom));

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripFilter = pageHeader.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvent = pageMain.querySelector('.trip-events');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripNavigation, createMenuTemplate(), 'beforeend');
render(tripMain, createRouteTemplate(daySortPoints), 'afterbegin');
const tripInfo = tripMain.querySelector('.trip-main__trip-info');
render(tripInfo, createPriceTemplate(points), 'beforeend');
render(tripFilter, createFilterTemplate(), 'beforeend');
render(tripEvent, createSortTempalte(), 'beforeend');
render(tripEvent, createTripListTemplate(), 'beforeend');

const tripEventList = pageMain.querySelector('.trip-events__list');

render(tripEventList, createPointEditTemplate(daySortPoints[0]), 'beforeend');
// render(tripEventList, createNewPoint(), 'beforeend');

for (let i = 1; i < POINT_COUNT; i ++) {
  render(tripEventList, createPointTemplate(daySortPoints[i]), 'beforeend');
}
