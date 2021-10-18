import { getDateInFormatDM } from '../util.js';

const TOWNS_COUNT = 3;

export const createRouteTemplate = (points) => {
  const firstDate = getDateInFormatDM(points[0].dateFrom);
  const lastDate = getDateInFormatDM(points[points.length - 1].dateFrom);
  const towns = Array.from(new Set(points.map((point) => point.town)));

  return `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title"> ${towns.length <= TOWNS_COUNT ? towns.map((town) => town).join(' &mdash; ') : `${towns[0]} &mdash; ... &mdash; ${towns[towns.length-1]}`}</h1>

  <p class="trip-info__dates">${firstDate}&nbsp;&mdash;&nbsp;${lastDate}</p>
</div>
</section>`;
};
