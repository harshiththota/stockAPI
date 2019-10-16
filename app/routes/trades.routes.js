module.exports = (app) => {
  const trades = require('../controllers/trades.controller.js');

  // Create a new trade
  app.post('/trade', trades.create);
}