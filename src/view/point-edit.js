import { getDateInFullFormat, isDay1AfterDay2 } from '../utils/point.js';
import Smart from './smart.js';
import { TYPES, TOWNS } from '../const.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  type: TYPES[0],
  dateFrom: null,
  dateTo: null,
  price: 0,
  offers: [],
  destination: {
    description: '',
    name: '',
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

const createPointEditOfferTemplate = (allOffers, offers) => allOffers.length !==0 ? `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
    ${allOffers.map(({title, price}, index) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox
        visually-hidden"
        id="event-offer-${title}-${index}"
        type="checkbox"
        name="event-offer-${title}"
        ${offers.some((offer) => offer.title === title) ? 'checked' : ''}
      >
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

const createPointEditTemplate = (data) => {
  const { type, dateFrom, dateTo, price, offers, destination, allOffers } = data;

  const dateFromFormat = getDateInFullFormat(dateFrom);
  const dateToFormat = getDateInFullFormat(dateTo);
  const allOffersForCurrentPointType = allOffers.find((offer) => offer.type === type).offers;

  const typeListTemplate = createPointEditTypeListTemplate(type);
  const destinationListTemplate = createPointEditDestinationListTemplate();
  const offerTemplate = createPointEditOfferTemplate(allOffersForCurrentPointType, offers);
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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
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

export default class PointEdit extends Smart {
  constructor(point = BLANK_POINT, allOffers, allDestinations) {
    super();
    this._data = PointEdit.parsePointToData(point, allOffers, allDestinations);
    this._datepickerFrom = null;
    this._datepickerTo = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._rollupClickHandler = this._rollupClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._offerChangeHandler = this._offerChangeHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }
    if (this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }
  }

  reset(point, allOffers, allDestinations) {
    this.updateData(
      PointEdit.parsePointToData(point, allOffers, allDestinations),
    );
  }

  getTemplate() {
    return createPointEditTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setRollupClickHandler(this._callback.rollupClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepicker() {
    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }
    if (this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }

    this._datepickerFrom = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.dateFrom,
        onChange: this._dateFromChangeHandler,
      },
    );

    this._datepickerTo = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.dateTo,
        minDate: this._data.dateFrom,
        onChange: this._dateToChangeHandler,
      },
    );
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._typeChangeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destinationInputHandler);
    const offersCollection = this.getElement().querySelectorAll('.event__offer-selector');
    for (const offer of offersCollection) {
      offer.addEventListener('change', this._offerChangeHandler);
    }
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    let newDestination = this._data.allDestinations.find((destination) => destination.name === evt.target.value);
    if (newDestination === undefined) {
      newDestination = {
        description: '',
        name: '',
        pictures: [],
      };
    }
    this.updateData({
      destination: newDestination,
    });
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: [],
    });
  }

  _offerChangeHandler(evt) {
    evt.preventDefault();
    const allOffersForCurrentPointType = this._data.allOffers.find((offer) => offer.type === this._data.type).offers;
    const targetOffer = allOffersForCurrentPointType.find((offer) => offer.title === evt.target.name.slice(12));
    if (evt.target.checked) {
      this.updateData({
        offers: this._data.offers.concat(targetOffer),
      });
    } else {
      this.updateData({
        offers: this._data.offers.filter((offer) => offer.title !== targetOffer.title),
      });
    }
  }

  _dateFromChangeHandler([userDate]) {
    this.updateData({
      dateFrom: userDate,
    });
  }

  _dateToChangeHandler([userDate]) {
    this.updateData({
      dateTo: userDate,
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    if (isDay1AfterDay2(this._data.dateFrom, this._data.dateTo) > 0 ) {
      this.updateData({
        dateTo: this._data.dateFrom,
      });
    }
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _rollupClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupClick();
  }

  setRollupClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupClickHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  static parsePointToData(point, allOffers, allDestinations) {
    return Object.assign(
      {},
      point,
      {
        allOffers,
        allDestinations,
      });
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);
    delete data.allOffers;
    delete data.allDestinations;
    return data;
  }
}
