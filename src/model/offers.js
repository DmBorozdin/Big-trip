import Observer from '../utils/observer.js';

export default class Offers extends Observer {
  constructor () {
    super();
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getAllOffers() {
    return this._offers;
  }

  getOffersForType(type) {
    return this._offers.find((offer) => offer.type === type).offers;
  }
}
