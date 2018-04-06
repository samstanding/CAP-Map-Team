const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

// Authentication Template
router.get('/', (req, res) => {
    // check if logged in
    if (req.isAuthenticated()) {
      // send back user object from database
      res.send(req.user);
    } else {
      // failure best handled on the server. do redirect here.
      res.sendStatus(403);
    }
  });

  module.exports = router;