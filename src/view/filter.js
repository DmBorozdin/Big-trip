import {FILTERS} from '../const.js';

export const createFilterTemplate = () => `<form class="trip-filters" action="#" method="get">
  ${FILTERS.map((filter, index) => `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${index===0 ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`).join('')}

  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
