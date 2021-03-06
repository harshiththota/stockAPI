const Securities = require('../models/securities.model.js');
const _ = require('lodash');

const CURRENT_PRICE = 100;

// Create new Security
exports.createSecurity = function (trade) {
  const newSecurity = new Securities({
    tickerSymbol: trade.tickerSymbol,
    quantity: trade.quantity,
    averageBuyPrice: trade.price
  });

  return newSecurity.save()
    .catch(err => {
      throw new Error(err + "Some error occurred while creating the new Security");
    });
};

exports.createOrUpdateSecurity = function (trade) {
  return Securities.findOne({ tickerSymbol: trade.tickerSymbol})
    .then((security) => {
        if (!security) {
          return exports.createSecurity(trade);
        }

        // Updates current security
        security.averageBuyPrice = ((security.quantity * security.averageBuyPrice)
          + (trade.quantity * trade.price)) / (security.quantity + trade.quantity);
        security.quantity = security.quantity + trade.quantity;

        return security.save()
          .catch(err => {
            throw new Error(err + "Some error occurred while creating the new Security");
          });
      });
};

exports.updateSecurity = function (trade) {
  return Securities.findOne({ tickerSymbol: trade.tickerSymbol })
    .then((security) => {
      if (!security) {
        throw new Error("Cannot update trade with out security");
      }

      // Updates current security
      security.averageBuyPrice = ((security.quantity * security.averageBuyPrice)
        + (trade.quantity * trade.price)) / (security.quantity + trade.quantity);
      security.quantity = security.quantity + trade.quantity;

      return security.save()
        .catch(err => {
          throw new Error(err + "Some error occurred while creating the new Security");
        });
    });
};

exports.deleteSecutity = function (trade) {
  return Securities.findOne({ tickerSymbol: trade.tickerSymbol })
    .then((security) => {
      if (!security) {
        throw new Error("Security not found in your portfolio");
      }

      if (security.quantity < trade.quantity) {
        throw new Error("Trade quantity is more than the security quantity");
      }

      security.quantity = (security.quantity - trade.quantity);
      
      return security.save()
        .catch(err => {
          throw new Error(err + "Some error occurred while creating the new Security");
        });
    });
};

// Returns all securities which quantity greaterthan 0
exports.getSecurities = function () {
  return Securities.find({ quantity: { $gt: 0 }})
    .then(securities => securities);
};

// Calulate and return Returns
exports.getReturns = function () {
  return exports.getSecurities()
    .then((securities) => {
      let returns = 0;
      _.forEach(securities, (security) => {
        returns += ((CURRENT_PRICE - security.averageBuyPrice) * security.quantity);
      });

      return returns;
    });
};
