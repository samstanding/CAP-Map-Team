const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.get('/events', (req, res)=>{
    if (req.isAuthenticated()) {
        pool.query(`select * from events order by date;`)
        .then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    }else{
        res.sendStatus(403);
    }
})

  module.exports = router;