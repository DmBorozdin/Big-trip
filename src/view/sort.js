import { SORTS } from '../const.js';
import Abstract from './abstract.js';

const createSortTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${SORTS.map((sort, index) => `<div class="trip-sort__item  trip-sort__item--${sort}">
  <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" ${index===0 ? 'checked' : ''} ${sort==='event' || sort==='offer' ? 'disabled' : ''}>
  <label class="trip-sort__btn" for="sort-${sort}">${sort === 'offer' ? `${sort}s` : sort}</label>
</div>`).join('')}
</form>`;

export default class Sort extends Abstract {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if(evt.target.tagName !=='LABEL') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.htmlFor.slice(5));
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
