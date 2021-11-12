import MenuView from './view/menu.js';
import TripInfoPresenter from './presenter/trip-info.js';
import { generatePoint, Destinations } from './mock/point.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import { OFFERS } from './const.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import { render, RenderPosition } from './utils/render.js';


const POINT_COUNT = 10;
const points = new Array(POINT_COUNT).fill(null).map(generatePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);
const filterModel = new FilterModel();

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripFilter = pageHeader.querySelector('.trip-controls__filters');
const tripEvent = document.querySelector('.trip-events');

render(tripNavigation, new MenuView(), RenderPosition.BEFOREEND);

const tripInfoPresenter = new TripInfoPresenter(tripMain, pointsModel);
const tripPresenter = new TripPresenter(tripEvent, pointsModel, filterModel, OFFERS, Destinations);
const filterPresenter = new FilterPresenter(tripFilter, filterModel);

tripInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
