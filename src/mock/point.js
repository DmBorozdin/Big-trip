import dayjs from 'dayjs';

const types = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Transport',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const towns = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
];

const MAX_PRICE = 2000;

const getRandomInteger = (lower = 0, upper = 1) => {
  const min = Math.ceil(Math.min(lower, upper));
  const max = Math.floor(Math.max(lower, upper));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const generateDate = () => {
  const maxDaysGap = 7;
  const maxDuration = 1440;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const duration = getRandomInteger(1, maxDuration);
  const dateFrom = dayjs().add(daysGap, 'day');
  const dateTo = dateFrom.add(duration, 'minute');
  return [dateFrom.toDate(), dateTo];
};

const generatePicture = () => {
  const maxPictureCount = 5;
  const minPictureCount = 1;
  const pictureCount = getRandomInteger(minPictureCount, maxPictureCount);
  const pictures = new Array(pictureCount).fill(null).map(() => {
    const maxPictureNumber = 100;
    const pictureNumber = getRandomInteger(0, maxPictureNumber);
    return `http://picsum.photos/248/152?r=${pictureNumber}`;
  });
  return pictures;
};

export const generatePoint = () => {
  const {dateFrom, dateTo} = generateDate();

  return {
    type: getRandomArrayElement(types),
    town: getRandomArrayElement(towns),
    offers: [{
      type: 'Taxi',
      title: 'Upgrade to comfort class',
      price: '50',
    }],
    destination: {
      description: 'Singapore, is a beautiful city',
      pictures: generatePicture(),
    },
    dateFrom,
    dateTo,
    price: getRandomInteger(0, MAX_PRICE),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
