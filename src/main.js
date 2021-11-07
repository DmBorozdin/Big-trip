import { isDay1AfterDay2 } from './utils/point.js';
import MenuView from './view/menu.js';
import TripInfoView from './view/trip-info.js';
import RouteView from './view/route.js';
import PriceView from './view/price.js';
import FilterView from './view/filter.js';
import { generatePoint, Destinations } from './mock/point.js';
// import { generateFilter } from './mock/filter.js';
import TripPresenter from './presenter/trip.js';
import { render, RenderPosition } from './utils/render.js';

const POINT_COUNT = 10;
const points = new Array(POINT_COUNT).fill(null).map(generatePoint);
const daySortPoints = points.slice().sort((point1, point2) =>  isDay1AfterDay2(point1.dateFrom, point2.dateFrom));

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripFilter = pageHeader.querySelector('.trip-controls__filters');
const tripEvent = document.querySelector('.trip-events');

const renderTripInfo = (tripInfoContainer, tripInfoPoints) => {
  if (tripInfoPoints.length !== 0) {
    const tripInfoComponent = new TripInfoView();
    render(tripInfoContainer, tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(tripInfoComponent, new RouteView(daySortPoints), RenderPosition.AFTERBEGIN);
    render(tripInfoComponent, new PriceView(points), RenderPosition.BEFOREEND);
  }
};

const tripPresenter = new TripPresenter(tripEvent);

render(tripNavigation, new MenuView(), RenderPosition.BEFOREEND);
render(tripFilter, new FilterView(), RenderPosition.BEFOREEND);
renderTripInfo(tripMain, points);
tripPresenter.init(points, Destinations);
