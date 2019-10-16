const _ = require('lodash');

// Checks whether data is defined and is string or not
exports.isString = function (data) {
  return !_.isNil(data) && _.isString(data);
};

// Checks whether data is defined and is number or not
exports.isNumber = function (data) {
  return !_.isNil(data) && _.isNumber(data);
};

// Validates the trade
exports.isValidTrade = function (trade) {
  if (exports.isString(trade.tickerSymbol) && exports.isNumber(trade.quantity)
    && exports.isNumber(trade.price)) {
    return true;
  }

  return false;
};