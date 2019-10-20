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
router.get("/startGame", (req, res, next) => {
    var buffer = nodeMod.StartGame();
    console.log(buffer);
    res.send(buffer);
});


module.exports = router;