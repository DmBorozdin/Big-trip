import SortView from '../view/sort.js';
import TripListView from '../view/trip-list.js';
// import { createNewPoint } from '../view/new-point.js';
import EmptyListView from '../view/list-empty.js';
import PointPresenter from './point.js';
import { updateItem } from '../utils/common.js';
import { render, RenderPosition, remove} from '../utils/render.js';
import { sortPointByDay, sortPointByPrice, sortPointByDuration } from '../utils/point.js';
import { AvailableSortType} from '../const.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._tripPresenter = {};
    this._currentSortType = AvailableSortType.DAY;

    this._sortComponent = null;
    this._tripListComponent = new TripListView();
    this._emptyListView = new EmptyListView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints, OFFERS, destinations) {
    this._tripPoints = tripPoints.slice();
    this._offers = OFFERS.slice();
    this._destinations = destinations.slice();
    this._sourcedTripPoints = tripPoints.slice();
    this._sortPoints(this._currentSortType);
    this._renderTrip();
  }

  _handleModeChange() {
    Object.values(this._tripPresenter).forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatedPoint);
    this._tripPresenter[updatedPoint.id].init(updatedPoint, this._offers, this._destinations);
  }

  _sortPoints(sortType) {
    switch(sortType) {
      case AvailableSortType.DAY:
        this._tripPoints.sort(sortPointByDay);
        break;
      case AvailableSortType.PRICE:
        this._tripPoints.sort(sortPointByPrice);
        break;
      case AvailableSortType.TIME:
        this._tripPoints.sort(sortPointByDuration);
        break;
      default:
        break;
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortPoints(sortType);
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

  _renderPoints() {
    this._tripPoints.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderTripList() {
    render(this._tripContainer, this._tripListComponent, RenderPosition.BEFOREEND);
    this._renderPoints();
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
    if (this._tripPoints.length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderSort();
    this._renderTripList();
  }
}
