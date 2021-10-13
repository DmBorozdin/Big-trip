import dayjs from 'dayjs';

const types = [
  'taxi',
  'bus',
  'train',
  'ship',
  'transport',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const towns = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
];

const offerTitle = [
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train',
  'Order Uber',
  'Rent a car',
  'Add breakfast',
  'Book tickets',
  'Lunch in city',
];

const MAX_PRICE = 1500;
const MAX_OFFER_PRICE = 100;
const maxDescriptionCount = 5;

const getRandomInteger = (lower = 0, upper = 1) => {
  const min = Math.ceil(Math.min(lower, upper));
  const max = Math.floor(Math.max(lower, upper));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const shuffleArray = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    const RANDOM_INDEX = Math.floor(Math.random() * (index + 1));
    [array[index], array[RANDOM_INDEX]] = [array[RANDOM_INDEX], array[index]];
  }

  return array;
};

const getNewRandomArray = (array, count) => shuffleArray(array.slice()).slice(0, count);

const generateDate = () => {
  const maxDaysGap = 7;
  const maxDuration = 4320;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const duration = getRandomInteger(1, maxDuration);
  const dateFrom = dayjs().add(daysGap, 'day');
  const dateTo = dateFrom.add(duration, 'minute');
  return [dateFrom.toDate(), dateTo.toDate()];
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

const generateDescription = () => {
  const descriptionStub = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus';
  const descriptionArray = descriptionStub.split('. ');
  const descriptionCount = getRandomInteger(1, maxDescriptionCount);

  return getNewRandomArray(descriptionArray, descriptionCount);
};

const generateOffer = () => {
  const maxOfferCount = 5;
  const offerCount = getRandomInteger(0, maxOfferCount);
  const offers = new Array(offerCount).fill(null).map(() => {
    const offer = {
      title: getRandomArrayElement(offerTitle),
      price: getRandomInteger(0, MAX_OFFER_PRICE),
    };
    return offer;
  });

  return offers;
};

export const generatePoint = () => {
  const [dateFrom, dateTo] = generateDate();

  return {
    type: getRandomArrayElement(types),
    town: getRandomArrayElement(towns),
    offers: generateOffer(),
    destination: {
      description: generateDescription(),
      pictures: generatePicture(),
    },
    dateFrom,
    dateTo,
    price: getRandomInteger(0, MAX_PRICE),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
