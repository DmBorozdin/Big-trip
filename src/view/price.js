import Abstract from './abstract.js';

const createPriceTemplate = (points) => {
  const totalPrice = points.reduce((accumulator, point) => accumulator + point.price, 0);

  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
</p>`;
};

export default class Price extends Abstract {
  constructor(price) {
    super();
    this._price = price;
  }

  getTemplate() {
    return createPriceTemplate(this._price);
  }
}
