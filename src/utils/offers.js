export const getOffersForType = (offers, type) => offers.find((offer) => offer.type === type) !== undefined ? offers.find((offer) => offer.type === type).offers : [];
