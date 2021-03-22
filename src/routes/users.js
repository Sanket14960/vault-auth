const express = require('express');
const router = express.Router();

const User = require('../models/user')

// Creates account if one does not already exist 
router.post('/', (req,res) => {
  const { username, password } = req.body;

  if(!username || !password) {
    return res.status(400).json({error : 'Missing fields' });
  }

  User.findOne({ username })
    .then(user => {
      if(user) return res.status(400).json({error : "Username exists"});

      const addUser = new User(req.body)
      addUser.save((err) => err ? res.json(err): res.json(addUser))
    });
});

module.exports = router; 