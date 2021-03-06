import he from 'he';
import { getDateInFormatMD, getDateInFormatYMD, getDateInFormatHM, calculateDateDifference } from '../utils/point.js';
import Abstract from './abstract.js';

const createOfferPointTemplate = (offers) => offers.length !==0 ? `<ul class="event__selected-offers">
  ${offers.map(({title, price}) =>
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`).join('')}
</ul>` : '';

const createPointTemplate = (point) => {
  const {type, destination, dateFrom, dateTo, price, isFavorite, offers} = point;

  const date = getDateInFormatMD(dateFrom);
  const dateFullFormat = getDateInFormatYMD(dateFrom);
  const dateFromHour = getDateInFormatHM(dateFrom);
  const dateToHour = getDateInFormatHM(dateTo);
  const difference = calculateDateDifference(dateTo, dateFrom);

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  const offerTemplate = createOfferPointTemplate(offers);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime=${dateFullFormat}>${date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${he.encode(destination.name)}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${dateFrom}>${dateFromHour}</time>
          &mdash;
          <time class="event__end-time" datetime=${dateTo}>${dateToHour}</time>
        </p>
        <p class="event__duration">${difference}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${offerTemplate}
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
    </li>`;
};

export default class Point extends Abstract {
  constructor(point) {
    super();
    this._point = point;
    this._rollupClickHandler = this._rollupClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }

  _rollupClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupClick();
  }

  setRollupClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupClickHandler);
  }
}
