import PointEditView from '../view/point-edit.js';
import { nanoid } from 'nanoid';
import { render, RenderPosition, remove} from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';

export default class PointNew {
  constructor(tripListContainer, changeData) {
    this._tripListContainer = tripListContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleRollupClick = this._handleRollupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(allOffers, allDestinations) {
    if (this._pointEditComponent !== null) {
      return;
    }
    this._allOffers = allOffers;
    this._allDestinations = allDestinations;

    this._pointEditComponent = new PointEditView(undefined, this._allOffers, this._allDestinations);

    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setRollupClickHandler(this._handleRollupClick);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._tripListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }


  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      Object.assign({id: nanoid()}, point),
    );
    this.destroy();
  }

  _handleRollupClick() {
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }
}
