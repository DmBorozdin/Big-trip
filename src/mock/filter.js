import { isPointDateExpired, isPointDateFuture } from '../util.js';

const pointToFilterMap = {
  everything: (points) => points,
  past: (points) => points.filter((point) => isPointDateExpired(point.dateFrom)),
  future: (points) => points.filter((point) => isPointDateFuture(point.dateFrom)),
};

export const generateFilter = (points) => Object.entries(pointToFilterMap).map(([filterName, filterPoints]) => ({
  name: filterName,
  points: filterPoints(points),
}));
