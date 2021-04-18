export const errorHandler = (err, req, res, next) => {
  console.log('Something went wrong', err)

  res.status(400).send({
    message: 'Something went wrong'
  });
};

module.exports = errorHandler; 