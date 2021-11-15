import MenuView from './view/menu.js';
import TripInfoPresenter from './presenter/trip-info.js';
import { generatePoint, Destinations } from './mock/point.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import { OFFERS } from './const.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
import { render, RenderPosition } from './utils/render.js';
import { MenuItem } from './const.js';


const POINT_COUNT = 10;
const points = new Array(POINT_COUNT).fill(null).map(generatePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);
const filterModel = new FilterModel();
const offersModel = new OffersModel();
offersModel.setOffers(OFFERS);
const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(Destinations);

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripFilter = pageHeader.querySelector('.trip-controls__filters');
const tripEvent = document.querySelector('.trip-events');
const menuComponent = new MenuView();

render(tripNavigation, menuComponent, RenderPosition.BEFOREEND);

const tripInfoPresenter = new TripInfoPresenter(tripMain, pointsModel);
const tripPresenter = new TripPresenter(tripEvent, pointsModel, filterModel, offersModel, destinationsModel);
const filterPresenter = new FilterPresenter(tripFilter, filterModel);

const handleMenuClick = (menuItem) => {
  switch(menuItem) {
    case MenuItem.TABLE:

    break;
    case MenuItem.STATS:

    break;
  }
};

menuComponent.setMenuClickHandler(handleMenuClick);

tripInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
