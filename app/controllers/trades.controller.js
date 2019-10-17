const Trades = require('../models/trades.model.js');
const Validators = require('../validators.js');
const Securities = require('../controllers/securities.controller.js');

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
      Securities.create(data)
      .then(() => {
        res.send({ message: "Operation executed successfully"});
      })
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Trade."
      });
    });
};

// Return all trades
exports.getTrades = function () {
  return Trades.find()
    .then(trades => trades);
};

// Returns the portfolio data
exports.portfolio = (req, res) => {
  const result = {};

  return exports.getTrades()
    .then((trades) => {
      result.trades = trades;

      return Securities.getSecurities()
        .then((securities) => {
            result.securities = securities;

          res.send(result);
        });
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching the Portfolio."
      });
    });
};

exports.holdings = (req, res) => {
  return Securities.getSecurities()
        .then((securities) => {
          res.send(securities);
        }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching the Holdings."
      });
    });
};
