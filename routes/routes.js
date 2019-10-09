const express = require('express');
const router = express.Router();
const passport = require("passport");
const jasonWebToken = require('jsonwebtoken');
const User = require("../models/User");

//Register
router.post("/register", (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (error, user) => {
        if (error){
            res.json({success: false, msg:'Failed to register user'})
        } else {
            res.json({success: true, msg:'User registered'})
        }
    })
}); 

//Authenticate
router.get("/authenticate", (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(
        username, (err, user) => {
            if (err) throw err;
        }
    );

    res.send("AUTHENTICATE");
}); 

//Profile
router.get("/profile", (req, res, next) => {
    res.send("PROFILE");
}); 

//Validate
router.get("/validate", (req, res, next) => {
    res.send("VALIDATE");
}); 

module.exports = router;