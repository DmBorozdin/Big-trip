import PointsModel from '../model/points.js';
import { isOnline } from '../utils/common.js';

const getSyncedPoints = (items) => items.filter(({sucsess}) => sucsess).map(({payload}) => payload.point);

const createStoreStructure = (data) =>
  data.reduce((acc, current) => Object.assign({}, acc, {[current.id]: current}), {});

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getData(dataType) {
    if(isOnline()) {
      return this._api.getData(dataType)
        .then((data) => {
          const items = createStoreStructure(data.map(PointsModel.AdaptToServer));
          this._store.setItems(items);
          return data;
        });
    }

    const storeItems = Object.values(this._store.getItems());

    return Promise.resolve(storeItems.map(PointsModel.AdaptToClient));
  }

  updatePoint(point){
    if(isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setItem(updatedPoint.id, PointsModel.AdaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setItem(point.id, PointsModel.AdaptToServer(Object.assign({}, point)));

    return Promise.resolve(point);
  }

  addPoint(point){
    if(isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, PointsModel.AdaptToServer(newPoint));
          return newPoint;
        });
    }

    return Promise.reject(new Error('Add point failed'));
  }

  deletePoint(point){
    if(isOnline()) {
      return this._api.deletePoint(point)
        .then(() => {
          this._store.removeItem(point.id);
        });
    }

    return Promise.reject(new Error('Delete point failed'));
  }

  sync() {
    if(isOnline()) {
      const storePoints = Object.values(this._store.getItems());

      return this._api.sync(storePoints)
        .then((responce) => {
          const createdPoints = getSyncedPoints(responce.created);
          const updatedPoints = getSyncedPoints(responce.updated);

          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error('Sync data failed'));
  }
}
