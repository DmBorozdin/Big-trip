import { getDateInFullFormat, createElement } from '../util.js';
import { TYPES, TOWNS } from '../const.js';

const BLANK_POINT = {
  type: TYPES[0],
  town: '',
  dateFrom: null,
  dateTo: null,
  price: null,
  offers: [],
  destination: {
    description: '',
    pictures: [],
  },
};

const createPointEditTypeListTemplate = (currentType) => `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${TYPES.map((type) => `<div class="event__type-item">
          <input
            id="event-type-${type}-1"
            class="event__type-input
            visually-hidden"
            type="radio"
            name="event-type"
            value="${type}"
            ${currentType === type ? 'checked' : ''}
          >
          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
        </div>`).join('')}
      </fieldset>
    </div>`;

const createPointEditDestinationListTemplate = () =>  `<datalist id="destination-list-1">
      ${TOWNS.map((town) => `<option value="${town}"></option>`).join('')}
    </datalist>`;

const createPointEditOfferTemplate = (offers) => offers.length !==0 ? `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
    ${offers.map(({title, price}, index) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${index}" type="checkbox" name="event-offer-${title}">
      <label class="event__offer-label" for="event-offer-${title}-${index}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`).join('')}
  </div>
</section>` : '';

const createPointEditDestinationTemplate = ({description, pictures}) => (description !== '' || pictures.length !== 0) ? `<section class="event__section  event__section--destination">
<h3 class="event__section-title  event__section-title--destination">Destination</h3>
${description !== '' ? `<p class="event__destination-description">${description}</p>` : ''}

${pictures.length !== 0 ? `<div class="event__photos-container">
<div class="event__photos-tape">
  ${pictures.map((picture) => `<img class="event__photo" src="${picture}" alt="Event photo">`).join('')}
</div>
</div>` : ''}
</section>` : '';

const createPointEditTemplate = (point) => {
  const { type, town, dateFrom, dateTo, price, offers, destination } = point;

  const dateFromFormat = getDateInFullFormat(dateFrom);
  const dateToFormat = getDateInFullFormat(dateTo);

  const typeListTemplate = createPointEditTypeListTemplate(type);
  const destinationListTemplate = createPointEditDestinationListTemplate();
  const offerTemplate = createPointEditOfferTemplate(offers);
  const destinationTemplate = createPointEditDestinationTemplate(destination);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          ${typeListTemplate}
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${town}" list="destination-list-1">
          ${destinationListTemplate}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value='${dateFromFormat}'>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value='${dateToFormat}'>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${offerTemplate}
        ${destinationTemplate}
      </section>
    </form>
    </li>`;
};

export default class PointEdit {
  constructor(point = BLANK_POINT) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createPointEditTemplate(this._point);
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
