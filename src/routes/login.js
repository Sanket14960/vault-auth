const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')


const User = require('../models/user')

router.post('/', (req,res) => {
  const { username, password } = req.body;
  
  User.findOne({ username })
    .then(user => {
      
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'invalid creds' })

          res.json({
            id : user.id,
            username: user.username,
            password: user.password
          })
        })
    })
});

module.exports = router; 