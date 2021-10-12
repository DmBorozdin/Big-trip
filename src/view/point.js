import dayjs from 'dayjs';

const MINUTE_IN_HOUR = 60;
const MINUTE_IN_DAY = 1440;

export const createPoint = (point) => {
  const {type, dateFrom, dateTo, price} = point;

  const date = dayjs(dateFrom).format('MMM D');
  const dateFromHour = dayjs(dateFrom).format('HH:mm');
  const dateToHour = dayjs(dateTo).format('HH:mm');
  const differenceInMinute = dayjs(dateTo).diff(dayjs(dateFrom), 'm');
  let difference = differenceInMinute;
  if (differenceInMinute < MINUTE_IN_HOUR) {
    difference = `${differenceInMinute}M`;
  } else if (differenceInMinute < MINUTE_IN_DAY) {
    const differenceInHour = dayjs(dateTo).diff(dayjs(dateFrom), 'h');
    const leftDifferenceInMinute = differenceInMinute - differenceInHour*MINUTE_IN_HOUR;
    difference = differenceInHour < 10 ? `0${differenceInHour}H` : `${differenceInHour}H`;
    difference = leftDifferenceInMinute < 10 ? `${difference} 0${leftDifferenceInMinute}M` : `${difference} ${leftDifferenceInMinute}M`;
  }
  // else {
  //   const differenceInDay = dayjs(dateTo).diff(dayjs(dateFrom), 'd');
  //   const leftDifferenceInHour = (differenceInMinute - differenceInDay*MINUTE_IN_DAY)/MINUTE_IN_HOUR;
  //   const leftDifferenceInMinute = differenceInMinute - differenceInHour*MINUTE_IN_HOUR;
  //   difference = differenceInDay < 10 ? `0${differenceInDay}D` : `${differenceInDay}D`;
  //   difference = differenceInHour < 10 ? `0${differenceInHour}H` : `${differenceInHour}H`;
  //   difference = leftDifferenceInMinute < 10 ? `${difference} 0${leftDifferenceInMinute}M` : `${difference} ${leftDifferenceInMinute}M`;
  // }

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} Amsterdam</h3>
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
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">20</span>
        </li>
      </ul>
      <button class="event__favorite-btn event__favorite-btn--active" type="button">
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
