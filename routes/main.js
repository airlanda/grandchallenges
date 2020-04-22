const express = require('express');
const router = express.Router();
const nodeMod = require('../build/Release/native');


//Profile
router.post("/startGame", (req, res, next) => {

    //const start = Date.now();
    //req.body.galaxyNumber
    let userInputs = {
        galaxyNumber: req.body.galaxyNumber,

    };
    //console.log(userInputs.galaxyNumber)
    // Call method on the C++ side, returns galaxy/planetary data 
    var buffer = nodeMod.StartGame(userInputs);

    //console.log(buffer);
    res.send(buffer);
});


module.exports = router;