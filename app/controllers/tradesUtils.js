const Trades = require('../models/trades.model.js');
const SecuritiesUtils = require('./securitiesUtils.js');


exports.createTrade = function (trade) {
  // Create a Trade
  const trade = new Trades({
    tickerSymbol: trade.tickerSymbol,
    quantity: trade.quantity,
    price: trade.price,
    type: trade.BUY,
  });

  // Save Trade in the database
  return trade.save()
    .then(() => {
        // Update Securitites 
      return SecuritiesUtils.createOrUpdateSecurities(trade)
        .then((data) => {
            return data;
        })
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Trade."
      });
    });
};