import Abstract from './abstract.js';

const createTripListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripList extends Abstract {
  getTemplate() {
    return createTripListTemplate();
  }
}
