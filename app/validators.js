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
  /* 
    Validators
    tickerSymbol - Should be string
    quantity - Should be number
    price - Should be number
    Quantity should greater than 0
   */
  if (exports.isString(trade.tickerSymbol) && exports.isNumber(trade.quantity)
    && exports.isNumber(trade.price) && trade.quantity > 0) {
    return true;
  }

  return false;
};