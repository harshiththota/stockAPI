const Trades = require('../models/trades.model.js');
const Validators = require('../validators.js');

const TRADE_TYPE = {
  BUY: 'buy',
  SELL: 'sell',
}

// Create and Save a new Trade
exports.create = (req, res) => {
  // Validate trade
  if (!Validators.isValidTrade(req.body)) {
    return res.status(400).send({
      message: "Invalid trade parameters"
    });
  }

  // Create a Trade
  const trade = new Trades({
    tickerSymbol: req.body.tickerSymbol,
    quantity: req.body.quantity,
    price: req.body.price,
    type: TRADE_TYPE.BUY,
  });

  // Save Trade in the database
  trade.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Trade."
      });
    });

};