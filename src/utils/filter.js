import { FilterType } from '../const.js';
import { isPointDateExpired, isPointDateFuture } from './point.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointDateFuture(point.dateFrom) || isPointDateFuture(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointDateExpired(point.dateTo) || isPointDateExpired(point.dateFrom)),
};
