const express = require('express');
const Kitty = require("../models/kitty");
const User = require("../models/user");
const router = express.Router();

//Middleware example, time is printed when an api is called
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.post('/save-kitty', (req, res) => {
    let kitty = new Kitty({'name': req.body.name});
    kitty.save(function (err, k) {
        if (err) return console.error(err);
        k.meow();
    });
    res.send("Kitty added:" + kitty)
})

router.get('/test', (req, res) => {
    res.send('Hello Test!')
})

router.post("/auth/signup", async (req, res) => {
    let newUser = new User({
        name: req.body.name,
        password: req.body.password
    });

    await User.findOne({ name: newUser.name }).then(async profile => {
            if (!profile) {
                await newUser.save()
                    .then(() => {
                        res.status(200).send(newUser);
                    })
                    .catch(err => {
                        console.log("Error is ", err.message);
                    });
            } else {
                res.send("User already exists...");
            }
        }).catch(err => {console.log("Error is", err.message);});
})

router.post("auth/login", async (req, res) => {
    let newUser = {};
    newUser.name = req.body.name;
    newUser.password = req.body.password;

    await User.findOne({ name: newUser.name }).then(profile => {
            if (!profile) {
                res.send("User not exist");
            } else {
                if (profile.password === newUser.password) {
                    res.send("User authenticated");
                } else {
                    res.send("User Unauthorized Access");
                }
            }
        }).catch(err => {console.log("Error is ", err.message);});
});

module.exports = router;