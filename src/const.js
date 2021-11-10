export const TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const TOWNS = ['Amsterdam', 'Chamonix', 'Geneva', 'Singapore'];

export const FILTERS = ['everything', 'future', 'past'];

export const SORTS = ['day', 'event', 'time', 'price', 'offer'];

export const AvailableSortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        title: 'Switch to comfort class',
        price: 10,
      },
      {
        title: 'Choose the radio station',
        price: 5,
      },
      {
        title: 'Order Uber',
        price: 20,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        title: 'Choose seats',
        price: 30,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        title: 'Switch to comfort class',
        price: 40,
      },
      {
        title: 'Add meal',
        price: 60,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        title: 'Upgrade to a business class',
        price: 100,
      },
      {
        title: 'Add breakfast',
        price: 45,
      },
    ],
  },
  {
    type: 'transport',
    offers: [],
  },
  {
    type: 'drive',
    offers: [
      {
        title: 'Rent a car',
        price: 120,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        title: 'Add luggage',
        price: 35,
      },
      {
        title: 'Switch to comfort class',
        price: 65,
      },
      {
        title: 'Travel by train',
        price: 100,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [],
  },
  {
    type: 'sightseeing',
    offers: [
      {
        title: 'Book tickets',
        price: 10,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        title: 'Lunch in city',
        price: 20,
      },
    ],
  },
];
