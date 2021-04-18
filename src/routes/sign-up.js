const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const RequestError = require('../errors/validation-error');
const DatabaseError = require('../errors/database-error');
const bcrypt = require('bcrypt')

const User = require('../models/user')

// Creates account if one with same email does not already exist 
router.post(
  '/', 
  [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
  ], 
  async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestError(errors.array());
    }

    User.findOne({ email })
      .then(user => {
        if(user) return res.status(400).json({error : "email already exists"});
        
        const addUser = new User({
          email,
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
                  email: user.email,
                })
              })
          });
        })
      });
});

module.exports = router; 