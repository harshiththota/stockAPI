const Securities = require('../models/securities.model.js');


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

}