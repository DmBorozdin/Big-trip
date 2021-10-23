import Abstract from './abstract.js';

const createTripInfoTemplate = () => '<section class="trip-main__trip-info  trip-info"></section>';

export default class TripInfo extends Abstract {
  getTemplate() {
    return createTripInfoTemplate();
  }
}
