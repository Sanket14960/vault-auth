const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

// Login and verify passowrd matches hashed password in DB
router.post('/', async (req,res) => {
  const { email, password } = req.body;

  if(!password || !email) {
    return res.status(400).json({error : "Fields can not be empty"});
  }

  const existingUser = await User.findOne({ email, password });

  if(!existingUser) {
    return res.status(400).json({error : "Invalid credentials provided"})
  }

  const checkPassword = bcrypt.compare(password, existingUser.password)

  if(!checkPassword) {
    return res.status(400).json({ msg: 'invalid creds' })
  } else {
    const jwtToken = jwt.sign({
      id: existingUser?.id,
      email: existingUser?.email
    }, process.env.SECRET_KEY, {
      expiresIn: '15m'
    });
    res.cookie("token", jwtToken, {
      expires: new Date(Date.now() + 15 * 60 * 1000),
      httpOnly: false,
      secure: false
    });
    res.status(200).json({message: existingUser.email + " Has Logged in!", token: jwtToken})
  }
});

module.exports = router;
