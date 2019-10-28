const express = require('express');
const router = express.Router();
const User = require("../models/User");
const nodeMod = require('../build/Release/native');

//route1
router.post("/route1", (req, res, next) => {

});

//Authenticate
router.get("/route2", (req, res, next) => {


});

//Profile
router.post("/startGame", (req, res, next) => {

    //req.body.galaxyNumber
    let userInputs = {
        galaxyNumber: req.body.galaxyNumber,

    };
    console.log(userInputs.galaxyNumber)
    var buffer = nodeMod.StartGame(userInputs);
    var commodities = buffer[256];
    console.log(buffer);
    console.log(commodities);
    res.send(buffer);
});


module.exports = router;