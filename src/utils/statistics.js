export const makeItemsUniq = (items) => [...new Set(items)];

export const pointSumPriceByType = (points, type) => points.reduce((accumulator, point) => {
  const price = point.type === type ? point.price : 0;
  return accumulator + price;
}, 0);

export const countPointsByType = (points, type) => points.filter((point) => point.type === type).length;
