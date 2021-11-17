import Abstract from './abstract.js';
import { MenuItem } from '../const.js';

const createMenuTemplate = (currentMenuItem) => `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn ${currentMenuItem === MenuItem.TABLE ? 'trip-tabs__btn--active' : ''}" data-menu-item="${MenuItem.TABLE}"  href="#">Table</a>
  <a class="trip-tabs__btn ${currentMenuItem === MenuItem.STATS ? 'trip-tabs__btn--active' : ''}" data-menu-item="${MenuItem.STATS}" href="#">Stats</a>
</nav>`;

export default class Menu extends Abstract {
  constructor(currentMenuItem) {
    super();

    this._currentMenuItem = currentMenuItem;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._currentMenuItem);
  }

  _menuClickHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}

