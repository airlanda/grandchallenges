const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database.js')
const nodeMod = require('./build/Release/native');
//var addon = require('bindings')('hello');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (error) => {
    console.log('Error connecting to DB: ' + error);
});

const app = express();

const routes = require("./routes/routes");

const port = 3000;

//Cross Origin Middleware
app.use(cors());

//Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Body parser middleware
app.use(bodyParser.json());

app.use("/startGame", routes);

app.get("/", (req, res) => {
    res.send('Invalid Endpoint Homies');
})

console.log(nodeMod.hello()); // 'world
console.log(nodeMod.TestMethod());
app.listen(port, () => {
    console.log('Server sarted on port ' + port);
})