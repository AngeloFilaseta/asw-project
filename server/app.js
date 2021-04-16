const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sockjs_echo = require("./controller/sockjs/sockjsEcho");
const passport = require("passport");
const app = express()
const port = 3000
const dbUrl = require("./conf/db").url;

//decode every request body to json format
app.use(bodyParser.json());

app.use(require('./routes/auth'));
app.use(require('./routes/resources'));

require("./conf/strategies/jsonwtStrategy")(passport); //Config for JWT strategy
app.use(passport.initialize()); // Passport service used to generate JWT for the auth routes.

//attach sockJS to the app
sockjs_echo.installHandlers(app, {prefix:'/eventbus'});

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
