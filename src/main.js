import { isDay1AfterDay2 } from './util.js';

import MenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
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
import { render, RenderPosition } from './util.js';

const POINT_COUNT = 10;

const renderPoint = (tripListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replacePointToForm = () => {
    tripListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    tripListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
  });

  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  pointEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
  });

  render(tripListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

const points = new Array(POINT_COUNT).fill(null).map(generatePoint);
const daySortPoints = points.slice().sort((point1, point2) =>  isDay1AfterDay2(point1.dateFrom, point2.dateFrom));

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripFilter = pageHeader.querySelector('.trip-controls__filters');
const pageMain = document.querySelector('.page-main');
const tripEvent = pageMain.querySelector('.trip-events');

render(tripNavigation, new MenuView().getElement(), RenderPosition.BEFOREEND);
const tripInfoComponent = new TripInfoView();
render(tripMain, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoComponent.getElement(), new RouteView(daySortPoints).getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoComponent.getElement(), new PriceView(points).getElement(), RenderPosition.BEFOREEND);
render(tripFilter, new FilterView().getElement(), RenderPosition.BEFOREEND);
render(tripEvent, new SortView().getElement(), RenderPosition.BEFOREEND);
const tripListComponent = new TripListView();
render(tripEvent, tripListComponent.getElement(), RenderPosition.BEFOREEND);

// renderTemplate(tripEventList, createNewPoint(), 'beforeend');
for (let i = 0; i < POINT_COUNT; i ++) {
  renderPoint(tripListComponent.getElement(), daySortPoints[i]);
}
