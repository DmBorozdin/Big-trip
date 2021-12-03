import SortView from '../view/sort.js';
import TripListView from '../view/trip-list.js';
import EmptyListView from '../view/list-empty.js';
import PointPresenter, {State as PointPresenterViewState} from './point.js';
import NewPointPresenter from './new-point.js';
import LoadingView from '../view/loading.js';
import { render, RenderPosition, remove} from '../utils/render.js';
import { sortPointByDay, sortPointByPrice, sortPointByDuration } from '../utils/point.js';
import { filter } from '../utils/filter.js';
import { SortType, UpdateType, UserAction, FilterType} from '../const.js';

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel, offersModel, destinationsModel, api, setEnableNewPointButton) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;
    this._isLoadingPoints = true;
    this._isLoadingOffers = true;
    this._isLoadingDestinations = true;
    this._api = api;
    this._setEnableNewPointButton = setEnableNewPointButton;

    this._sortComponent = null;
    this._tripListComponent = new TripListView();
    this._emptyListComponent = new EmptyListView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    render(this._tripContainer, this._tripListComponent, RenderPosition.BEFOREEND);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._offersModel.addObserver(this._handleModelEvent);
    this._destinationsModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTripBoard({resetSortType: true});

    remove(this._sortComponent);
    remove(this._tripListComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
    this._offersModel.removeObserver(this._handleModelEvent);
    this._destinationsModel.removeObserver(this._handleModelEvent);
  }

  createPoint() {
    this._newPointPresenter = new NewPointPresenter(this._tripListComponent, this._handleViewAction, this._offers, this._destinations, this._setEnableNewPointButton);
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newPointPresenter.init();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch(this._currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointByDay);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointByDuration);
    }

    return filteredPoints;
  }

  _handleModeChange() {
    if (this._newPointPresenter !== undefined) {
      this._newPointPresenter.destroy();
    }
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
    this._setEnableNewPointButton();
  }

  _handleViewAction(actionType, updateType, update) {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => this._pointsModel.updatePoint(updateType, response))
          .catch(() => this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING));
        break;
      case UserAction.ADD_POINT:
        this._newPointPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => this._pointsModel.addPoint(updateType, response))
          .catch(() => this._newPointPresenter.setAborting());
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => this._pointsModel.deletePoint(updateType, update))
          .catch(() => this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING));
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTripBoard();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTripBoard({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT_POINT:
        this._isLoadingPoints = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
      case UpdateType.INIT_DESTINATIONS:
        this._isLoadingDestinations = false;
        this._destinations = this._destinationsModel.getAllDestinations();
        remove(this._loadingComponent);
        this._renderTrip();
        break;
      case UpdateType.INIT_OFFERS:
        this._isLoadingOffers = false;
        this._offers = this._offersModel.getAllOffers();
        remove(this._loadingComponent);
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
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handleViewAction, this._handleModeChange, this._offers, this._destinations);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEmptyList() {
    render(this._tripContainer, new EmptyListView(), RenderPosition.BEFOREEND);
  }

  _clearTripBoard({resetSortType = false} = {}) {
    if (this._newPointPresenter !== undefined) {
      this._newPointPresenter.destroy();
    }
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._emptyListComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderTrip() {
    if (this._isLoadingPoints || this._isLoadingDestinations || this._isLoadingOffers) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    if (points.length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderSort();
    this._renderPoints(points);
  }
}
