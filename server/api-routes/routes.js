const express = require('express');
const Kitty = require("../models/kitty");
const router = express.Router();

//Middle ware that is specific to this router
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

module.exports = router;