export const TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const SORTS = ['day', 'event', 'time', 'price', 'offer'];

export const AvailableSortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const MenuItem = {
  TABLE: 'table',
  STATS: 'stats',
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
  INIT_POINT: 'INIT_POINT',
  INIT_OFFERS: 'INIT_OFFERS',
  INIT_DESTINATIONS: 'INIT_DESTINATIONS',
};

export const DataType = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};
