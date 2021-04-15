const express = require('express');
const mongoose = require('mongoose');
const app = express()
const port = 3000
const mongodbPort = 27017
const dbName = "guessr"
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//import the api-routes
app.use(require('./api-routes/routes'));

//DB Connection
mongoose.connect('mongodb://localhost:'+ mongodbPort +'/'+ dbName, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection to MongoDB: OK")
});

app.listen(port, () => {
    console.log("Welcome to GuessR Node.js Server")
})
