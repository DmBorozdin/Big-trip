import {SORTS} from '../const.js';
import { createElement } from '../util.js';

const createSortTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${SORTS.map((sort, index) => `<div class="trip-sort__item  trip-sort__item--${sort}">
  <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" ${index===0 ? 'checked' : ''}>
  <label class="trip-sort__btn" for="sort-${sort}">${sort === 'offer' ? `${sort}s` : sort}</label>
</div>`).join('')}
</form>`;

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
