const express = require('express');
const router = express.Router();

// Temporary test route
router.get('/test', (req, res) => {
  res.send('Auth route working!');
});

module.exports = router;
