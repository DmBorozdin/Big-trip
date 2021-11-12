import Abstract from './abstract.js';

const createPriceTemplate = (points) => {
  const totalPrice = points.reduce((accumulator, point) => {
    const totalOfferPrice = point.offers.length > 0 ? point.offers.reduce((offerAccumulator, offer) => offerAccumulator + offer.price, 0) : 0;
    return accumulator + point.price + totalOfferPrice;
  }, 0);
  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
</p>`;
};

export default class Price extends Abstract {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createPriceTemplate(this._points);
  }
}
