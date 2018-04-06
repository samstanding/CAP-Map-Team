const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

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

router.get('/events', (req, res)=>{
    pool.query(`select * from events order by date;`)
    .then(function(result) {
        res.send(result.rows);
    }).catch(function(error) {
        res.sendStatus(500);
    })
})

module.exports = router;