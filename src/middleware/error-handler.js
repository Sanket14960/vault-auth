module.exports = function (err, req, res, next) {
  console.log('Something went wrong', err)

  res.status(400).json({
    message: err.message
  });
};