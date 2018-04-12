const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/post', (req,res)=>{
const guideline = req.body;
const sqlText = `INSERT INTO information (description, category) VALUES ($1, $2);`;
pool.query(sqlText, [guideline.description, guideline.category])
    .then(function(result){
        console.log('Information added', result);
        res.sendStatus(201);
    })
    .catch(function(error){
        console.log('Could not add information', error);
        res.sendStatus(500);
    })
})

router.get('/get', (req,res)=>{
    pool.query(`SELECT * FROM information ORDER BY id;`)
    .then(function(result){
        res.send(result.rows);
    })
    .catch(function(error){
        res.sendStatus(500);
    })
})

router.put('/edit/:id', (req,res)=>{
    const guideline = req.body;
    const sqlText = `UPDATE information SET description = $1, category = $2 WHERE id = $3;`;
    pool.query(sqlText, [guideline.description, guideline.category, guideline.id])
    .then(function(result){
        console.log('Guideline updated', result);
        res.sendStatus(201);
    })
    .catch(function (error) {
        console.log('Could not update guideline', error);
        res.sendStatus(500);
    })
})

router.delete('/delete/:id', (req, res) => {
    // if (req.isAuthenticated()) {
    const id = req.params
    pool.query(`delete from information where id = $1;`, [req.params.id])
    // } else {
    //     res.sendStatus(403);
    // }
    .then(function (result) {
        console.log('Guideline deleted', result);
        res.sendStatus(201);
    })
    .catch(function (error) {
        console.log('Could not delete guideline', error);
        res.sendStatus(500);
    })
});

module.exports = router;