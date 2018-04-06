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

router.put('/event/edit', (req, res) => {
    // if (req.isAuthenticated()) {
    pool.query(`UPDATE events SET title = $1, date_time = $2, description = $3, notes = $4, category = $5, photo_url = $6, age_group = $7, price = $8 WHERE id = $9;`,
    [req.body.title, req.body.date_time, req.body.description, req.body.notes, req.body.category, req.body.photo_url, req.body.age_group, req.body.price, req.body.id])
    // } else {
    // res.sendStatus(403);
    // }
});

router.delete('/event/delete/:id', (req, res) => {
    // if (req.isAuthenticated()) {
        pool.query(`delete from events where id = $1;`, [req.prams.id])
    // } else {
    //     res.sendStatus(403);
    // }
});

router.get('/locations/all', (req, res) => {
    // if (req.isAuthenticated()) {
        pool.query('SELECT * FROM map JOIN map_artifact_join on map.id = map_artifact_join.location_id JOIN artifact on artifact.id = map_artifact_join.artifact_id;')
    // } else {
    //     res.sendStatus(403);
    // }
});

module.exports = router;