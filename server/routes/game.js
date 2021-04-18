const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const GameController = require("../controller/game")

router.post("/store/game", auth, (req, res) => GameController.storeGame(req, res));

module.exports = router;