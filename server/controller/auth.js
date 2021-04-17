const Responses = require("../middleware/response");
const Errors = require("../middleware/errors");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../conf/conf");

async function signup(req, res) {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    await User.findOne({ username: newUser.username }).then(async profile => {
        if (!profile) {
            newUser.save().then(() => {
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
    let newUser = {};
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    await User.findOne({ username: newUser.username }).then(profile => {
        if (!profile) {
            Errors.NotFoundError(res, {message: "Wrong credentials inserted."});
        } else {
            console.log(newUser.password + " " + profile.password);
            bcrypt.compare(
                newUser.password,
                profile.password,
                async (err, result) => {
                    if (err) {
                        Errors.ServerError(res, {message: err.message});
                    } else if (result === true) {
                        const payload = {
                            id: profile.id,
                            username: profile.username
                        };
                        jsonwt.sign(
                            payload,
                            key.secret,
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

module.exports = {
    signup,
    login,
    getProfile
}