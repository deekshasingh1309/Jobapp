var express = require('express');
var app = express(); //init Express
var bodyParser = require('body-parser');
const cors = require('cors') 
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/naukriapp';
//init bodyParser to extract properties from POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

// Connecting to the database
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome" });
});

require('./routes/app.routes')(app);
// listen for requests
app.listen(8082, () => {
    console.log("Server is listening on port 8082");
});