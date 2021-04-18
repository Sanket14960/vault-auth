const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

// Login and verify passowrd matches hashed password in DB
router.post('/', (req,res) => {
  const { username, password } = req.body;
  
  User.findOne({ username })
    .then(user => {
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'invalid creds' })
          else {
          const jwtToken = jwt.sign({id: user.id, username: user.username}, process.env.SECRET_KEY);         
          res.json({message: 'Logged In!', token: jwtToken})
          }
        })
    })
});

module.exports = router; 