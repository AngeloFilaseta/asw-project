const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sockjs_echo = require("./controller/sockJSController");
const app = express()
const port = 3000
const mongodbPort = 27017
const dbName = "guessr"

//attach sockJS to the app
sockjs_echo.installHandlers(app, {prefix:'/eventbus'});

//decode every request body to json
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
