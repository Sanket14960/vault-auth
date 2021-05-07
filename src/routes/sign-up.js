const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user')

// Creates account if one with same email does not already exist
router.post('/', (async (req, res) => {
  const { email, password } = req.body;

  if(!password || !email) {
    return res.status(400).json({error : "Fields can not be empty"});
  }

  const existingUser = await User.findOne({ email })

  if(existingUser) {
    return res.status(400).json({error : "email already exists"});
  }


  const addUser = new User({
    email,
    password
  });
  var user = await addUser.save()

  const jwtToken = jwt.sign({
    id: user?.id,
    email: user?.email
  }, process.env.SECRET_KEY, {
    expiresIn: '15m'
  });

   res.status(201).json({'User ID': addUser.id, message: "User Account Created!", token: jwtToken})
}));



module.exports = router;
