module.exports = (app) => {
  const trades = require('../controllers/trades.controller.js');

  // Create a new trade
  app.post('/trade', trades.create);

  // Remove a trade
  app.delete('/trade/', trades.delete);

  // fetch portfolio
  app.get('/portfolio', trades.portfolio);

  // fetch holdings
  app.get('/holdings', trades.holdings);

  // fetch returns
  app.get('/returns', trades.returns);
};