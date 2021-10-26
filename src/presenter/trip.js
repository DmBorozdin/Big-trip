import SortView from '../view/sort.js';
import TripListView from '../view/trip-list.js';
import PointView from '../view/point.js';
// import { createNewPoint } from '../view/new-point.js';
import PointEditView from '../view/point-edit.js';
import EmptyListView from '../view/list-empty.js';

import { render, RenderPosition, replace} from '../utils/render.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortComponent = new SortView();
    this._tripListComponent = new TripListView();
    this._emptyListView = new EmptyListView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
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

    render(this._tripListComponent, pointComponent, RenderPosition.BEFOREEND);
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

  _renderTrip() {
    if (this._tripPoints.length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderSort();
    this._renderTripList();
  }
}
