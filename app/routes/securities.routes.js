module.exports = (app) => {
  const securities = require('../controllers/securities.controller.js');

  app.get('/holdings', securities.getHoldings);
}