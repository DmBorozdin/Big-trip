import PointEditView from '../view/point-edit.js';
import { render, RenderPosition, remove} from '../utils/render.js';
import { UserAction, UpdateType } from '../const.js';
import { isOnline } from '../utils/common.js';
import { toast } from '../utils/toast.js';

export default class PointNew {
  constructor(tripListContainer, changeData, offers, destinations, setEnableNewPointButton, renderEmptyList) {
    this._tripListContainer = tripListContainer;
    this._changeData = changeData;
    this._offers = offers;
    this._destinations = destinations;
    this._setEnableNewPointButton = setEnableNewPointButton;
    this._renderEmptyList = renderEmptyList;

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
      this._setEnableNewPointButton();
      this._renderEmptyList();
    }
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    if (!isOnline()) {
      toast('You can\'t save point offline');
      return;
    }
    this._setEnableNewPointButton();
  }

  _handleCancelClick() {
    this.destroy();
    this._setEnableNewPointButton();
    this._renderEmptyList();
  }
}
