const Responses = require("../middleware/response");
const Errors = require("../middleware/errors");
const UserFactory = require("../mongoose/model/factory/user");
const User = require("../mongoose/model/user");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const key = require("../conf/conf");
const NotificationFactory = require("../mongoose/model/factory/notification");

async function signup(req, res) {
    let newUser = UserFactory.createUser(req.body.username, req.body.password);
    await User.findOne({ username: newUser["username"]}).then(async profile => {
        if (!profile) {
            newUser.save().then(() => {
                createWelcomeNotification(newUser.id)
                Responses.OKResponse(res, newUser);
            }).catch(err => {
                Errors.ServerError(res, {message: err.message});
            });
        } else {
            Errors.ConflictError(res,{message: "User already exists, use another username."});
        }
    }).catch(err => {
        Errors.ServerError(res, {message: err.message});
    });
}

async function login(req, res) {
    let newUser = UserFactory.createUser(req.body.username, req.body.password);

    await User.findOne({ username: newUser["username"] }).then(profile => {
        if (!profile) {
            Errors.NotFoundError(res, {message: "Wrong credentials inserted."});
        } else {
            bcrypt.compare(
                newUser["password"],
                profile.password,
                async (err, result) => {
                    if (err) {
                        Errors.ServerError(res, {message: err.message});
                    } else if (result === true) {
                        const payload = {
                            id: profile.id,
                            username: profile.username
                        };
                        jsonwebtoken.sign(
                            payload,
                            key.token_secret,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) {
                                    Errors.ServerError(res, {message: err.message});
                                }
                                Responses.OKResponse(res,{success: true, token: "Bearer " + token})
                            }
                        );
                    } else {
                        Errors.UnauthorizedError(res,{message: "Wrong credentials inserted."})
                    }
                }
            );
        }
    }).catch(err => {
        console.log("Error is ", err.message);
    });
}

function getProfile(req, res) {
    Responses.OKResponse(res, {id: req.user.id, username: req.user.username});
}


function createWelcomeNotification(userId){
    let newNotification = NotificationFactory.createNotification("Welcome to GuessR!", "Have fun playing :)", new Date(), userId);
    newNotification.save().then(() => { /* does nothing */ });
}

module.exports = {
    signup,
    login,
    getProfile
}