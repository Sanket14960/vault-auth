const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const User = require('../models/user')

// Creates account if one with same username does not already exist 
router.post('/', (req,res) => {
  const { username, password } = req.body;

  if(!username || !password) {
    return res.status(200).json({error : 'Missing fields' });
  }

  User.findOne({ username })
    .then(user => {
      if(user) return res.status(400).json({error : "Username already exists"});
      
      const addUser = new User({
        username,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(addUser.password, salt, (err, hash) => {
          if(err) throw err;
          addUser.password = hash;
          addUser.save()
            .then(user => {
              res.json({
                id : user.id,
                username: user.username,
              })
            })
        });
      })
    });
});

module.exports = router; 