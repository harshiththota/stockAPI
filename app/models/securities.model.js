const mongoose = require('mongoose');

const SecuritiesSchema = mongoose.Schema({
  tickerSymbol: String,
  quantity: Number,
  averageBuyPrice: Decimal128,
}, {
  timestamps: true
});

module.exports = mongoose.model('Securities', SecuritiesSchema);