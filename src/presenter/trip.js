import SortView from '../view/sort.js';
import TripListView from '../view/trip-list.js';
// import { createNewPoint } from '../view/new-point.js';
import EmptyListView from '../view/list-empty.js';
import PointPresenter from './point.js';
import { updateItem } from '../utils/common.js';
import { render, RenderPosition} from '../utils/render.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._tripPresenter = {};

    this._sortComponent = new SortView();
    this._tripListComponent = new TripListView();
    this._emptyListView = new EmptyListView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._renderTrip();
  }

  _handleModeChange() {
    Object.values(this._tripPresenter).forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._tripPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleSortTypeChange(sortType) {

  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
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

  _renderTrip() {
    if (this._tripPoints.length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderSort();
    this._renderTripList();
  }
}
