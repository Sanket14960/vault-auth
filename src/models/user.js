const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { type: String, index: { unique: true }, required: true }, 
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
  if(!this.isModified('password'))
    return next();
  bcrypt.hash(this.password,10,(err,passwordHash) => {
    if(err)
      return next(err);
    this.password = passwordHash;
    next();
  });
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema)
