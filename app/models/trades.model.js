const mongoose = require('mongoose');

const TradesSchema = mongoose.Schema({
  tickerSymbol: String,
  quantity: Number,
  price: mongoose.Schema.Types.Decimal128,
  type: String, 
}, {
  timestamps: true
});

module.exports = mongoose.model('Trades', TradesSchema);