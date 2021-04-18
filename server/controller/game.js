const Errors = require("../middleware/errors");
const GameFactory = require("../models/factory/game");

function storeGame(req, res) {
    let newGame = GameFactory.createGame(req.body.time_start, req.body.time_end);

    Errors.ServerError(res, {message: "Not Implemented"})
}

module.exports = {
    storeGame
}

