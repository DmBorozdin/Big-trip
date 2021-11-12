import TripInfoView from '../view/trip-info.js';
import RouteView from '../view/route.js';
import PriceView from '../view/price.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';

export default class TripInfo {
  constructor(tripInfoContainer, pointsModel) {
    this._tripInfoContainer = tripInfoContainer;
    this._pointsModel = pointsModel;
  }
}
