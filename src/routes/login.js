const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require('../models/user')

router.post('/', (req,res) => {
  User.findOne({username: req.body.username}, function(err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }
    return res.json({ token: jwt.sign({ username: user.username }, 'secret') });
  });
});

