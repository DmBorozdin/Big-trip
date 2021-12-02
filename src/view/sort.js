import { SortType } from '../const.js';
import Abstract from './abstract.js';

const createSortTemplate = (currentSortType) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${Object.values(SortType).map((sort) => `<div class="trip-sort__item  trip-sort__item--${sort}">
  <input
    id="sort-day"
    class="trip-sort__input  visually-hidden"
    type="radio"
    name="trip-sort"
    value="sort-${sort}"
    ${sort === currentSortType ? 'checked' : ''}
    ${sort === SortType.EVENT || sort === SortType.OFFERS ? 'disabled' : ''}
  >
  <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
</div>`).join('')}
</form>`;

export default class Sort extends Abstract {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    const selectedSortType = evt.target.htmlFor.slice(5);
    if(evt.target.tagName !=='LABEL' || selectedSortType === SortType.EVENT || selectedSortType === SortType.OFFERS) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(selectedSortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
