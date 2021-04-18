const UserInGame = require("../userInGame");

function createUserInGame(idUser, idGame, reportName) {
    return new UserInGame({
        id_user: idUser,
        id_game: idGame,
        report_name: reportName
    });
}

module.exports = {createUserInGame}
