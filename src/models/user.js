const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, index: { unique: true }, required: true }, 
  password: { type: String, required: true },
});

module.exports = mongoose.model('USER', userSchema)
