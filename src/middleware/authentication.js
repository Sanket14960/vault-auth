const JwtStrategy = require('passport-jwt').Strategy,
const ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = function (opt) 
{
  
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    algorithms: ['RS256']
  }

}
