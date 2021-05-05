const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: { type: String, index: { unique: true }, required: true }, 
  password: { type: String, required: true },
}, {
  toJSON: {
    transform (doc, ret) {
      delete ret.password;
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

userSchema.pre('save', async function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  })
});

module.exports = mongoose.model('user', userSchema)
