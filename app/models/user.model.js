const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  userId: String,
  password: Number,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);