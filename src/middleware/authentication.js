const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = function (opt) 
{
  
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    algorithms: ['RS256']
  }
  
  passport.use(new JwtStrategy(options, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
    });
  }));
}
