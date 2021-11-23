import PointEditView from '../view/point-edit.js';
import { render, RenderPosition, remove} from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';

export default class PointNew {
  constructor(tripListContainer, changeData, offers, destinations) {
    this._tripListContainer = tripListContainer;
    this._changeData = changeData;
    this._offers = offers;
    this._destinations = destinations;

    this._pointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
  }

  init() {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new PointEditView(undefined, this._offers, this._destinations, true);

    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleCancelClick);

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
      point,
    );
    this.destroy();
  }

  _handleCancelClick() {
    this.destroy();
  }
}
