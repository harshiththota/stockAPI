const Securities = require('../models/securities.model.js');
const _ = require('lodash');

const CURRENT_PRICE = 100;

exports.create = function (trade) {
  return Securities.findOne({ tickerSymbol: trade.tickerSymbol})
    .then((security) => {
        if (!security) {
          const newSecurity = new Securities ({
            tickerSymbol: trade.tickerSymbol,
            quantity: trade.quantity,
            averageBuyPrice: trade.price
          });

          return newSecurity.save()
            .catch(err => {
              throw new Error(err + "Some error occurred while creating the new Security");
            });
        }

        security.averageBuyPrice = ((security.quantity * security.averageBuyPrice)
          + (trade.quantity * trade.price)) / (security.quantity + trade.quantity);
        security.quantity = security.quantity + trade.quantity;

      return security.save()
        .catch(err => {
          throw new Error(err + "Some error occurred while creating the new Security");
        });
    })

};

// Returns all securities
exports.getSecurities = function () {
  return Securities.find()
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
