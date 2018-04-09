const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.get('/all', (req, res) => {
    // if (req.isAuthenticated()) {
    pool.query('SELECT * FROM map ORDER BY id DESC;')
        .then(function (result) {
            res.send(result.rows);
        }).catch(function (error) {
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
        [id]).then(function (result) {
            res.send(result.rows);
        }).catch(function (error) {
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
});

router.delete('/join/delete/:id', (req, res) => {
    let id = req.params.id;
    pool.query('DELETE * FROM map_artifact_join where id = $1', [id])
        .then(function (result) {
            res.send(result.rows);
        }).catch(function (error) {
            res.sendStatus(500);
        })
});

router.post('/join/insert', (req, res) => {
    // if (req.isAuthenticated()) {
    let id = req.params.id;
    pool.query('INSERT INTO map_artifact_join (artifact_id, location_id) VALUES ($1, $2)',
        [req.body.artifact_id, req.body.location_id], (err, result) => {
            if (err) {
                console.log("Error inserting data: ", err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        });
});

module.exports = router;