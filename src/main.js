import { isDay1AfterDay2 } from './utils/point.js';

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
import EmptyListView from './view/list-empty.js';
// import { generateFilter } from './mock/filter.js';
import { render, RenderPosition, replace } from './utils/render.js';

const POINT_COUNT = 10;

const points = new Array(POINT_COUNT).fill(null).map(generatePoint);
const daySortPoints = points.slice().sort((point1, point2) =>  isDay1AfterDay2(point1.dateFrom, point2.dateFrom));

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripFilter = pageHeader.querySelector('.trip-controls__filters');
const tripEvent = document.querySelector('.trip-events');

const renderPoint = (tripListElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setRollupClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setRollupClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(tripListElement, pointComponent, RenderPosition.BEFOREEND);
};

const renderTripInfo = (tripInfoContainer, tripInfoPoints) => {
  if (tripInfoPoints.length !== 0) {
    const tripInfoComponent = new TripInfoView();
    render(tripInfoContainer, tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(tripInfoComponent, new RouteView(daySortPoints), RenderPosition.AFTERBEGIN);
    render(tripInfoComponent, new PriceView(points), RenderPosition.BEFOREEND);
  }
};

const renderList = (tripListContainer, listPoints) => {
  if (listPoints.length === 0) {
    render(tripListContainer, new EmptyListView(), RenderPosition.BEFOREEND);
  } else {
    render(tripListContainer, new SortView(), RenderPosition.BEFOREEND);
    const tripListComponent = new TripListView();
    render(tripListContainer, tripListComponent, RenderPosition.BEFOREEND);

    // renderTemplate(tripEventList, createNewPoint(), 'beforeend');
    for (let i = 0; i < POINT_COUNT; i ++) {
      renderPoint(tripListComponent, listPoints[i]);
    }
  }
};

render(tripNavigation, new MenuView(), RenderPosition.BEFOREEND);
render(tripFilter, new FilterView(), RenderPosition.BEFOREEND);
renderTripInfo(tripMain, points);
renderList(tripEvent, daySortPoints);
