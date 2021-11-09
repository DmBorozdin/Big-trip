import SortView from '../view/sort.js';
import TripListView from '../view/trip-list.js';
// import { createNewPoint } from '../view/new-point.js';
import EmptyListView from '../view/list-empty.js';
import PointPresenter from './point.js';
import { render, RenderPosition, remove} from '../utils/render.js';
import { sortPointByDay, sortPointByPrice, sortPointByDuration } from '../utils/point.js';
import { AvailableSortType} from '../const.js';

export default class Trip {
  constructor(tripContainer, pointsModel) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._tripPresenter = {};
    this._currentSortType = AvailableSortType.DAY;

    this._sortComponent = null;
    this._tripListComponent = new TripListView();
    this._emptyListView = new EmptyListView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(OFFERS, destinations) {
    this._offers = OFFERS.slice();
    this._destinations = destinations.slice();
    this._sortPoints(this._currentSortType);
    this._renderTrip();
  }

  _getPoints() {
    switch(this._currentSortType) {
      case AvailableSortType.DAY:
        return this._pointsModel.getPoints().slice().sort(sortPointByDay);
      case AvailableSortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPointByPrice);
      case AvailableSortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortPointByDuration);
    }

    return this._pointsModel._getPoints();
  }

  _handleModeChange() {
    Object.values(this._tripPresenter).forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPresenter[updatedPoint.id].init(updatedPoint, this._offers, this._destinations);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTripList();
    this._renderTripList();
    this._clearSortForm();
    this._renderSort();
  }

  _renderSort() {
    this._sortComponent = new SortView(this._currentSortType);
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point, this._offers, this._destinations);
    this._tripPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderTripList() {
    render(this._tripContainer, this._tripListComponent, RenderPosition.BEFOREEND);
    this._renderPoints(this._getPoints());
  }

  _renderEmptyList() {
    render(this._tripContainer, new EmptyListView(), RenderPosition.BEFOREEND);
  }

  _clearTripList() {
    Object.values(this._tripPresenter).forEach((presenter) => presenter.destroy());
    this._tripPresenter = {};
  }

  _clearSortForm() {
    remove(this._sortComponent);
  }

  _renderTrip() {
    if (this._getPoints().length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderSort();
    this._renderTripList();
  }
}
