const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.get('/locations/all', (req, res) => {
    // if (req.isAuthenticated()) {
        console.log('in locations/all');
        pool.query('SELECT * FROM map JOIN map_artifact_join on map.id = map_artifact_join.location_id JOIN artifact on artifact.id = map_artifact_join.artifact_id;')
        .then(function(result) {
            res.send(result.rows);
          })
          .catch(function(error){
            console.log('Error on getting all locations:', error);
            res.sendStatus(500);
          })
        // } else {
    //     res.sendStatus(403);
    // }
});

module.exports = router;