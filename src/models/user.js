const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, index: { unique: true }, required: true }, 
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', userSchema)