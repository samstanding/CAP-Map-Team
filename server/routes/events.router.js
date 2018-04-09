const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.put('/edit', (req, res) => {
    // if (req.isAuthenticated()) {
    pool.query(`UPDATE events SET title = $1, date = $2, time = $3, description = $4, notes = $5, category = $6, photo_url = $7, age_group = $8, price = $9 WHERE id = $10;`,
    [req.body.title, req.body.date, req.body.time, req.body.description, req.body.notes, req.body.category, req.body.photo_url, req.body.age_group, req.body.price, req.body.id])
        .then(function (result) {
            console.log('Event updated', result);
            res.sendStatus(201);
        })
        .catch(function (error) {
            console.log('Could not update Event', error);
            res.sendStatus(500);
        })
    
    // } else {
    // res.sendStatus(403);
    // }
});

router.delete('/delete/:id', (req, res) => {
    // if (req.isAuthenticated()) {
        pool.query(`delete from events where id = $1;`, [req.prams.id])
    // } else {
    //     res.sendStatus(403);
    // }
});

router.get('/get', (req, res)=>{
    pool.query(`select * from events order by date;`)
    .then(function(result) {
        res.send(result.rows);
    }).catch(function(error) {
        res.sendStatus(500);
    })
})

router.post('/post', (req, res) =>{
    const event = req.body;
    const sqlText =  `INSERT INTO events (title, date, time, description, notes, category, photo_url, age_group, price)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    pool.query(sqlText, [event.title, event.date, event.time, event.description, event.notes, event.category, event.photo_url, event.age_group, event.price])
    .then(function(result){
        console.log('Event Added', event);
        res.sendStatus(201);
    })
    .catch(function(error){
        console.log('Could not add Event', error);
        res.sendStatus(500);
    })
})



module.exports = router;