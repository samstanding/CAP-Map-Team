const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.get('/all', (req, res) => {
    // if (req.isAuthenticated()) {
        let id = req.params.id;
        pool.query('SELECT * FROM map ORDER BY id DESC;',
        [id]).then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
});

router.get('/artifact/:id', (req, res) => {
    // if (req.isAuthenticated()) {
        let id = req.params.id;
        pool.query('SELECT * FROM map JOIN map_artifact_join on map.id = map_artifact_join.location_id JOIN artifact on artifact.id = map_artifact_join.artifact_id WHERE map.id = $1;',
        [id]).then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
});

module.exports = router;