const {broadcastMessageOnLobby} = require("../util/broadcastUtil");
const {getLobby} = require("../util/lobbiesUtil");

function endGameCommandHandler(socket, json) {
    let lobby = getLobby(json.lobbyCode)
    lobby.nTurns = 0
    broadcastMessageOnLobby(lobby, "backToLobby", undefined)
}

module.exports = endGameCommandHandler;