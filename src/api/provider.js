import PointsModel from '../model/points.js';
import OffersModel from '../model/offers.js';
import DestinationsModel from '../model/destinations.js';
import { isOnline } from '../utils/common.js';
import { DataType } from '../const.js';

const createStoreStructure = (data) =>
  data.reduce((acc, current) => Object.assign(
    {},
    acc,
    {[current.id]: current},
  ), {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getData(dataType) {
    if(isOnline()) {
      return this._api.getData(dataType)
        .then((data) => {
          let items = null;
          switch(dataType) {
            case DataType.POINTS:
              items = createStoreStructure(data.map(PointsModel.AdaptToServer));
              break;
            case DataType.OFFERS:
              items = createStoreStructure(data.map(OffersModel));
              break;
            case DataType.DESTINATIONS:
              items = createStoreStructure(data.map(DestinationsModel));
              break;
          }
          this._store.setItems(items);
          return data;
        });
    }

    const storeItems = Object.values(this._store.getItems());

    switch(dataType) {
      case DataType.POINTS:
        return Promise.resolve(storeItems.map(PointsModel.AdaptToClient));
      case DataType.OFFERS:
        return Promise.resolve(storeItems.map(OffersModel));
      case DataType.DESTINATIONS:
        return Promise.resolve(storeItems.map(DestinationsModel));
    }
  }
}
