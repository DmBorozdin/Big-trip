import PointsModel from './model/points.js';
import { DataType } from './const.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getData(dataType) {
    let data =  this._load({url: dataType}).then(Api.toJSON);

    if (dataType === DataType.POINTS) {
      data = data.then((points) => points.map(PointsModel.AdaptToClient));
    }
    return data;
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointsModel.AdaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJSON)
      .then(PointsModel.AdaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(responce) {
    if (responce.status < SuccessHTTPStatusRange.MIN || responce.status > SuccessHTTPStatusRange.MAX) {
      throw new Error(`${responce.status}: ${responce.statusText}`);
    }

    return responce;
  }

  static toJSON(responce){
    return responce.json();
  }

  static catchError(err) {
    throw err;
  }
}
