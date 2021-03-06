import { calculateDateDifferenceInMinute } from './point.js';

export const makeItemsUniq = (items) => [...new Set(items)];

export const pointSumPriceByType = (points, type) => points.reduce((accumulator, point) => {
  const price = point.type === type ? point.price : 0;
  return accumulator + price;
}, 0);

export const pointSumTimeSpendByType = (points, type) => points.reduce((accumulator, point) => {
  const tymeSpend = point.type === type ? calculateDateDifferenceInMinute(point.dateTo, point.dateFrom) : 0;
  return accumulator + tymeSpend;
}, 0);

export const countPointsByType = (points, type) => points.filter((point) => point.type === type).length;

export const getUniqPoints = (points) => {
  const pointTypes = points.map((point) => point.type);
  const uniqPointTypes = makeItemsUniq(pointTypes);
  const uniqPoints = uniqPointTypes.map((type) => ({
    type,
    price: pointSumPriceByType(points, type),
    count: countPointsByType(points, type),
    tymeSpend: pointSumTimeSpendByType(points, type),
  }));
  return uniqPoints;
};
