import MenuView from './view/menu.js';
import StatiscticsView from './view/statistics.js';
import TripInfoPresenter from './presenter/trip-info.js';
import { generatePoint, Destinations } from './mock/point.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import { OFFERS } from './const.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
import { render, RenderPosition, remove } from './utils/render.js';
import { MenuItem } from './const.js';


const POINT_COUNT = 10;
const points = new Array(POINT_COUNT).fill(null).map(generatePoint);
let previousMenuItem = null;

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
const pageBodyContainer = document.querySelector('.page-body__page-main .page-body__container');
const tripEvent = document.querySelector('.trip-events');
const newPointButton = document.querySelector('.trip-main__event-add-btn');
let menuComponent = null;
let renderMenu = null;
let statisticsComponent = null;

const tripInfoPresenter = new TripInfoPresenter(tripMain, pointsModel);
const tripPresenter = new TripPresenter(tripEvent, pointsModel, filterModel, offersModel, destinationsModel);
const filterPresenter = new FilterPresenter(tripFilter, filterModel);

const handleMenuClick = (menuItem) => {
  if (previousMenuItem === menuItem) {
    return;
  }
  switch(menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init();
      remove(statisticsComponent);
      newPointButton.disabled = false;
      renderMenu(MenuItem.TABLE);
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statisticsComponent = new StatiscticsView(pointsModel.getPoints());
      render(pageBodyContainer, statisticsComponent, RenderPosition.BEFOREEND);
      newPointButton.disabled = true;
      renderMenu(MenuItem.STATS);
      break;
  }
  previousMenuItem = menuItem;
};

renderMenu = (currentMenuItem) => {
  if (menuComponent !== null) {
    remove(menuComponent);
  }
  menuComponent = new MenuView(currentMenuItem);
  render(tripNavigation, menuComponent, RenderPosition.BEFOREEND);
  menuComponent.setMenuClickHandler(handleMenuClick);
};

renderMenu(MenuItem.TABLE);

tripInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();

newPointButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
