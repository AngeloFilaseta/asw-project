const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sockjs_echo = require("./controller/sockjsEcho");
const app = express()
const port = 3000
const dbUrl = require("./conf/db").url;

//attach sockJS to the app
sockjs_echo.installHandlers(app, {prefix:'/eventbus'});

//decode every request body to json
app.use(bodyParser.json());

//import the api-routes
app.use(require('./api-routes/routes'));

//DB Connection
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("GuessR DB is connected!");
    })
    .catch(err => {
        console.log("Error on database connection:\n", err.message);
    });

app.listen(port, () => {
    console.log("Welcome to GuessR Node.js Server")
})
