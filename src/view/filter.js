import {FILTERS} from '../const.js';
import { createElement } from '../util.js';

const createFilterTemplate = () => `<form class="trip-filters" action="#" method="get">
  ${FILTERS.map((filter, index) => `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${index===0 ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`).join('')}

  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class Filter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate();
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
