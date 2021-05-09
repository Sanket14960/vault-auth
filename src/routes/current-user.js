const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  console.log(req.user_details);
  res.status(200).json(req.user_details)
});

module.exports = router;
