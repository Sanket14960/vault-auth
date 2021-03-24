const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

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

module.exports = function (opt = { secret: 'secret' }) {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: opt.secret,
    algorithms: ['RS256']
  }
  const strategy = new JwtStrategy(options, user_callback)
  return passport.use(strategy);
}
