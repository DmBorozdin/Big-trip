import dayjs from 'dayjs';

const MINUTE_IN_HOUR = 60;
const MINUTE_IN_DAY = 1440;

export const isDay1AfterDay2 = (day1, day2) => dayjs(day1).isAfter(day2) ? 1 : -1;

export const isPointDateExpired = (date) => date === null ? false : dayjs(date).isBefore(dayjs(), 'D') && !dayjs(date).isSame(dayjs(), 'D');

export const isPointDateFuture = (date) => date === null ? false : dayjs(date).isAfter(dayjs(), 'D') || dayjs(date).isSame(dayjs(), 'D');

export const getDateInFormatHM = (date) => dayjs(date).format('HH:mm');

export const getDateInFormatDM = (date) => dayjs(date).format('D MMM');

export const getDateInFormatMD = (date) => dayjs(date).format('MMM D');

export const getDateInFormatYMD = (date) => dayjs(date).format('YYYY-MM-DD');

export const getDateInFullFormat = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export const calculateDateDifference = (dateTo, dateFrom) => {
  const differenceInMinute = dayjs(dateTo).diff(dayjs(dateFrom), 'm');
  let difference = differenceInMinute;
  if (differenceInMinute < MINUTE_IN_HOUR) {
    difference = `${differenceInMinute}M`;
  } else if (differenceInMinute < MINUTE_IN_DAY) {
    const differenceInHour = dayjs(dateTo).diff(dayjs(dateFrom), 'h');
    const leftDifferenceInMinute = differenceInMinute - differenceInHour*MINUTE_IN_HOUR;
    difference = differenceInHour < 10 ? `0${differenceInHour}H` : `${differenceInHour}H`;
    difference = leftDifferenceInMinute < 10 ? `${difference} 0${leftDifferenceInMinute}M` : `${difference} ${leftDifferenceInMinute}M`;
  } else {
    const differenceInDay = dayjs(dateTo).diff(dayjs(dateFrom), 'd');
    const leftDifferenceInHour =Math.floor((differenceInMinute - differenceInDay*MINUTE_IN_DAY)/MINUTE_IN_HOUR);
    const leftDifferenceInMinute = differenceInMinute - differenceInDay*MINUTE_IN_DAY - leftDifferenceInHour*MINUTE_IN_HOUR;
    difference = differenceInDay < 10 ? `0${differenceInDay}D` : `${differenceInDay}D`;
    difference = leftDifferenceInHour < 10 ? `${difference} 0${leftDifferenceInHour}H` : `${difference} ${leftDifferenceInHour}H`;
    difference = leftDifferenceInMinute < 10 ? `${difference} 0${leftDifferenceInMinute}M` : `${difference} ${leftDifferenceInMinute}M`;
  }
  return difference;
};

const getWeightForNullValue = (valueA, valueB) => {
  if (valueA === null && valueB === null) {
    return 0;
  }

  if (valueA === null) {
    return 1;
  }

  if (valueB === null) {
    return -1;
  }

  return null;
};

export const sortPointByDay = (pointA, pointB) => {
  const weight = getWeightForNullValue(pointA.dateFrom, pointB.dateFrom);

  if (weight !== null) {
    return weight;
  }

  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

export const sortPointByPrice = (pointA, pointB) => {
  const weight = getWeightForNullValue(pointA.price, pointB.price);

  if (weight !== null) {
    return weight;
  }

  return pointB.price - pointA.price;
};

export const sortPointByDuration = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDuration = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  const weight = getWeightForNullValue(pointADuration, pointBDuration);

  if (weight !== null) {
    return weight;
  }

  return pointBDuration - pointADuration;
};
