const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../models/user')

function user_callback(payload, done) {
  User.findOne({id: payload.sub}, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
  });
}

module.exports = function (opt = { secret: process.env.SECRET_KEY }) {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
    algorithms: ['RS256']
  }
  const strategy = new JwtStrategy(options, user_callback)
  return passport.use(strategy);
}
