const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const logger = require("./middleware/logger")
const passport = require("passport")
const server = require('http').createServer(app)
const socketCorsPolicy = {cors: {origin: "*", methods: "*"}}
const io = require('socket.io')(server, socketCorsPolicy)
const DB_ADDRESS = require("./conf/conf").dbAddress
const PORT = require("./conf/conf").port
const CLIENT_ADDRESS = require("./conf/conf").clientAddress
const ASCII_ART = require("./conf/conf").asciiArt
const corsOptions = {origin: CLIENT_ADDRESS, credentials: true}

// add cors policy
app.use(cors(corsOptions));

//decode every request body to json format
app.use(bodyParser.json());

//setup all the routes
app.use(logger);
app.use(require('./routes/auth'));
app.use(require('./routes/resources'));
app.use(require('./routes/notifications'));

//Config for JWT strategy
require("./conf/strategies/jsonwtStrategy")(passport);
app.use(passport.initialize()); // Passport service used to generate JWT for the auth routes.
require("./conf/strategies/jsonwtStrategy")


//attach socket controller
require("./socket/controller")(io);

//Setup the DB Connection
mongoose.connect(DB_ADDRESS, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("GuessR DB is connected!");
    })
    .catch(err => {
        console.log("Error on database connection:\n", err.message);
    });

server.listen(3000, () => {
    console.log("Welcome to GuessR Node.js Server!");
    console.log(ASCII_ART);
    console.log("Listening on port:" + PORT);
});


