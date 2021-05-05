const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (!req.get('Authorization')) {
    next(new Error("No auth token found"));
  }

  const token = req.get('Authorization').split(' ')[1];
  try {
    const user_details = jwt.verify(token, process.env.SECRET_KEY)
    console.log(user_details)
    req.user_details = user_details;
    next()
  } catch(err) {
    e = new Error("Invalid Token");
    e.stack = err.stack;
    console.log(err)
    next(e);
  }
}
