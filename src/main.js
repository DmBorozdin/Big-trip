import { isDay1AfterDay2 } from './util.js';

import MenuView from './view/menu.js';
import RouteView from './view/route.js';
import PriceView from './view/price.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import TripListView from './view/trip-list.js';
import PointView from './view/point.js';
// import { createNewPoint } from './view/new-point.js';
import PointEditView from './view/point-edit.js';
import { generatePoint } from './mock/point.js';
// import { generateFilter } from './mock/filter.js';
import { renderElement, RenderPosition } from './util.js';

const POINT_COUNT = 10;

const points = new Array(POINT_COUNT).fill(null).map(generatePoint);
const daySortPoints = points.slice().sort((point1, point2) =>  isDay1AfterDay2(point1.dateFrom, point2.dateFrom));

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripFilter = pageHeader.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvent = pageMain.querySelector('.trip-events');

renderElement(tripNavigation, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripMain, new RouteView(daySortPoints).getElement(), RenderPosition.AFTERBEGIN);
const tripInfo = tripMain.querySelector('.trip-main__trip-info');
renderElement(tripInfo, new PriceView(points).getElement(), RenderPosition.BEFOREEND);
renderElement(tripFilter, new FilterView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEvent, new SortView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEvent, new TripListView().getElement(), RenderPosition.BEFOREEND);

const tripEventList = pageMain.querySelector('.trip-events__list');

renderElement(tripEventList, new PointEditView(daySortPoints[0]).getElement(), RenderPosition.BEFOREEND);
// renderTemplate(tripEventList, createNewPoint(), 'beforeend');

for (let i = 1; i < POINT_COUNT; i ++) {
  renderElement(tripEventList, new PointView(daySortPoints[i]).getElement(), RenderPosition.BEFOREEND);
}
