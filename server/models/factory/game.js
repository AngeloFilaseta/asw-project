const Game = require("../game");

function createGame(title, description, idUser) {
    return new Game({
        time_start: title,
        time_end: description,
        id_user: idUser
    });
}

module.exports = {createGame};

