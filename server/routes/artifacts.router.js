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

router.post('/sculpture/save', (req, res) => {
    // if (req.isAuthenticated()) {
        let obj = req.body;
        pool.query('INSERT INTO artifact (type = $1, year = $2, material = $3, artist_name = $4, title = $5, description = $6, extended_description = $7)',
        [obj.type, obj.year, obj.material, obj.artist_name, obj.title, obj.description, obj.extended_description])
        .then(function(result){
            res.sendStatus(201);
        }).catch(function(error){
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
})

router.post('/newtext/save', (req, res) => {
    // if (req.isAuthenticated()) {
        let obj = req.body;
        pool.query('INSERT INTO artifact (type = $1, year = $2, title = $3, description = $4)',
        [obj.type, obj.year, obj.title, obj.description])
        .then(function(result){
            res.sendStatus(201);
        }).catch(function(error){
            res.sendStatus(500);
        })
    // } else {
    //     res.sendStatus(403);
    // }
})

module.exports = router;