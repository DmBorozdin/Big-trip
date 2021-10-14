export const createFilterTemplate = () => {
  const filters = ['everything', 'future', 'past'];

  return `<form class="trip-filters" action="#" method="get">
  ${filters.map((filter, index) => `<div class="trip-filters__filter">
    <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${index===0 ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>`).join('')}

  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};
