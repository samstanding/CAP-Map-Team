const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.get('/all', (req, res) => {
    // if (req.isAuthenticated()) {
        pool.query(`SELECT * FROM artifact ORDER BY id;`)
        .then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
})

router.put('/', (req, res) => {
    // if (req.isAuthenticated()) {
        pool.query(`UPDATE artifact SET vehicle_model = $1, bumper = $2, status = $3, location = $4 where id = $5`,
        [])
        .then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
})

router.get('/sculpture', (req, res) => {
    // if (req.isAuthenticated()) {
        pool.query(`SELECT * FROM artifact WHERE type = 'sculpture' ORDER BY id DESC;`)
        .then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
})

router.get('/media', (req, res) => {
    // if (req.isAuthenticated()) {
        pool.query(`SELECT * FROM artifact WHERE (type = 'photo') OR (type = 'video') ORDER BY id DESC;`)
        .then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
})

router.get('/writing', (req, res) => {
    // if (req.isAuthenticated()) {
        pool.query(`SELECT * FROM artifact WHERE (type = 'poem') OR (type = 'writing') OR (type = 'anecdote') ORDER BY id DESC;`)
        .then(function(result) {
            res.send(result.rows);
        }).catch(function(error) {
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
})

module.exports = router;