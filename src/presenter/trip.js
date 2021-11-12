import SortView from '../view/sort.js';
import TripListView from '../view/trip-list.js';
import EmptyListView from '../view/list-empty.js';
import PointPresenter from './point.js';
import NewPointPresenter from './new-point.js';
import { render, RenderPosition, remove} from '../utils/render.js';
import { sortPointByDay, sortPointByPrice, sortPointByDuration } from '../utils/point.js';
import { filter } from '../utils/filter.js';
import { AvailableSortType, UpdateType, UserAction, FilterType} from '../const.js';

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel, offers, destinations) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offers = offers.slice();
    this._destinations = destinations.slice();
    this._pointPresenter = {};
    this._currentSortType = AvailableSortType.DAY;

    this._sortComponent = null;
    this._tripListComponent = new TripListView();
    this._emptyListComponent = new EmptyListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._newPointPresenter = new NewPointPresenter(this._tripListComponent, this._handleViewAction);
  }

  init() {
    render(this._tripContainer, this._tripListComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  createPoint() {
    this._currentSortType = AvailableSortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newPointPresenter.init(this._offers, this._destinations);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch(this._currentSortType) {
      case AvailableSortType.DAY:
        return filteredPoints.sort(sortPointByDay);
      case AvailableSortType.PRICE:
        return filteredPoints.sort(sortPointByPrice);
      case AvailableSortType.TIME:
        return filteredPoints.sort(sortPointByDuration);
    }

    return filteredPoints;
  }

  _handleModeChange() {
    this._newPointPresenter.destroy();
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data, this._offers, this._destinations);
        break;
      case UpdateType.MINOR:
        this._clearTripBoard();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTripBoard({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTripBoard();
    this._renderTrip();
  }

  _renderSort() {
    if (this._sortComponent !==null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point, this._offers, this._destinations);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderEmptyList() {
    render(this._tripContainer, new EmptyListView(), RenderPosition.BEFOREEND);
  }

  _clearTripBoard({resetSortType = false} = {}) {
    this._newPointPresenter.destroy();
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._emptyListComponent);

    if (resetSortType) {
      this._currentSortType = AvailableSortType.DAY;
    }
  }

  _renderTrip() {
    const points = this._getPoints();
    if (points.length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderSort();
    this._renderPoints(points);
  }
}
