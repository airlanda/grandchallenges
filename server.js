const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mainRoutes = require("./routes/main");

const app = express();


const port = 3000;

//Cross Origin Middleware
app.use(cors());

//Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Body parser middleware
app.use(bodyParser.json());

app.use("/", mainRoutes);

app.get("/", (req, res) => {
    res.send('Invalid Endpoint Homies');
})



app.listen(port, () => {
    console.log('Server sarted on port ' + port);
})