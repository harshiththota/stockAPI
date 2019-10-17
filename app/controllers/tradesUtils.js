const Trades = require('../models/trades.model.js');

exports.createTrade = function (trade) {
  // Create a Trade
  const newTrade = new Trades({
    tickerSymbol: trade.tickerSymbol,
    quantity: trade.quantity,
    price: trade.price,
    type: trade.type,
  });

  // Save Trade in the database
  return newTrade.save()
    .then((data) => {
        return data;
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Trade."
      });
    });
};