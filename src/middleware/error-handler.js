const RequestError = require('../errors/validation-error');
const DatabaseError = require('../errors/database-error');

module.exports = function errorHandler (err, req, res, next) {
  
  if (err instanceof RequestError) {
    console.log('request validation error')
  }

  if (err instanceof DatabaseError) {
    console.log('db connection error')
  }
  res.status(400).send({
    message: err.message
  });
};

