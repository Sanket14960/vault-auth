const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.delete('/', async (req,res) => {
  res.clearCookie("token")
  res.status(200).json({ 'message': 'OK' })
});

module.exports = router; 