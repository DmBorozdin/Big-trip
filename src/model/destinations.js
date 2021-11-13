import Observer from '../utils/observer.js';

export default class Destinations extends Observer {
  constructor () {
    super();
    this._destinations = [];
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getAllDestinations() {
    return this._destinations;
  }

  getDestinationsDescription(name) {
    return this._destinations.find((destination) => destination.name === name);
  }
}
