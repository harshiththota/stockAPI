const Trades = require('../models/trades.model.js');
const Validators = require('../validators.js');
const SecuritiesUtils = require('./securitiesUtils.js');
const TradeUtils = require('./tradesUtils');

const TRADE_TYPE = {
  BUY: 'buy',
  SELL: 'sell',
}

// Create a new Trade
exports.create = (req, res) => {
  // Validate trade
  if (!Validators.isValidTrade(req.body)) {
    return res.status(400).send({
      message: "Invalid trade parameters"
    });
  }

  // Create a Trade
  const trade  = {
    tickerSymbol: req.body.tickerSymbol,
    quantity: req.body.quantity,
    price: req.body.price,
    type: TRADE_TYPE.BUY,
  };
  
  // Call func to create trade and update security
  return SecuritiesUtils.createOrUpdateSecurity(trade)
    .then(() => {
      // Update Securitites 
      return TradeUtils.createTrade(trade)
        .then(() => {
          res.send({ message: "Operation executed successfully" });
        })
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Trade."
      });
    });
};

// Updates the trade
exports.update = (req, res) => {
  if (!Validators.isValidTrade(req.body)) {
    return res.status(400).send({
      message: "Invalid trade parameters"
    });
  }

  // Create a Trade
  const trade = {
    tickerSymbol: req.body.tickerSymbol,
    quantity: req.body.quantity,
    price: req.body.price,
    type: TRADE_TYPE.BUY,
  };

  return SecuritiesUtils.updateSecurity(trade)
    .then(() => {
      return TradeUtils.createTrade(trade)
        .then(() => {
          res.send({ message: "Operation executed successfully" });
        });
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Trade."
      });
    });
};

exports.delete = (req, res) => {
  // Validate trade
  if (!Validators.isValidTrade(req.body)) {
    return res.status(400).send({
      message: "Invalid trade parameters"
    });
  }

  // Create a Trade
  const trade = {
    tickerSymbol: req.body.tickerSymbol,
    quantity: req.body.quantity,
    price: req.body.price,
    type: TRADE_TYPE.SELL,
  };

  return SecuritiesUtils.deleteSecutity(trade)
    .then(() => {
      return TradeUtils.createTrade(trade)
        .then(() => {
          res.send({ message: "Operation executed successfully" });
        });
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

      return SecuritiesUtils.getSecurities()
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
  return SecuritiesUtils.getSecurities()
        .then((securities) => {
          res.send(securities);
        }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching the Holdings."
      });
    });
};

exports.returns = (req, res) => {
  return SecuritiesUtils.getReturns()
    .then((returns) => {
      res.send({ returns: returns });
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching the Returns."
      });
    });
};
