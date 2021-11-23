import Observer from '../utils/observer.js';

export default class Destinations extends Observer {
  constructor () {
    super();
    this._destinations = [];
  }

  setDestinations(updateType, destinations) {
    this._destinations = destinations.slice();

    this._notify(updateType);
  }

  getAllDestinations() {
    return this._destinations;
  }

  getDestinationsDescription(name) {
    return this._destinations.find((destination) => destination.name === name);
  }
}
