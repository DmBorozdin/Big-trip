import TripInfoView from '../view/trip-info.js';
import RouteView from '../view/route.js';
import PriceView from '../view/price.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { sortPointByDay } from '../utils/point.js';

export default class TripInfo {
  constructor(tripInfoContainer, pointsModel) {
    this._tripInfoContainer = tripInfoContainer;
    this._pointsModel = pointsModel;

    this._tripInfoComponent = new TripInfoView();
    this._tripInfoRouteComponent = null;
    this._tripInfoPriceComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    this._renderRoute();
    this._renderPrice();
  }

  _handleModelEvent() {
    this._renderRoute();
    this._renderPrice();
  }

  _renderRoute() {
    const prevTripInfoRouteComponent = this._tripInfoRouteComponent;
    const points = this._pointsModel.getPoints();

    if (points.length === 0) {
      remove(prevTripInfoRouteComponent);
      this._tripInfoRouteComponent = null;
      return;
    }

    this._tripInfoRouteComponent = new RouteView(points.sort(sortPointByDay));

    if (prevTripInfoRouteComponent === null) {
      render(this._tripInfoComponent, this._tripInfoRouteComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._tripInfoRouteComponent, prevTripInfoRouteComponent);
    remove(prevTripInfoRouteComponent);
  }

  _renderPrice() {
    const prevTripInfoPriceComponent = this._tripInfoPriceComponent;
    const points = this._pointsModel.getPoints();

    if (points.length === 0) {
      remove(prevTripInfoPriceComponent);
      this._tripInfoPriceComponent = null;
      return;
    }

    this._tripInfoPriceComponent = new PriceView(points);

    if (prevTripInfoPriceComponent === null) {
      render(this._tripInfoComponent, this._tripInfoPriceComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._tripInfoPriceComponent, prevTripInfoPriceComponent);
    remove(prevTripInfoPriceComponent);
  }
}
