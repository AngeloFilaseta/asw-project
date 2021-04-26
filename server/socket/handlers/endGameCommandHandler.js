const {broadcastMessageOnLobby} = require("../util/broadcastUtil");
const {getLobby} = require("../util/lobbiesUtil");

function endGameCommandHandler(socket, lobbyCode) {
    let lobby = getLobby(lobbyCode)
    lobby.nTurns = 0
    broadcastMessageOnLobby(lobby, "backToLobby", undefined)
}

module.exports = endGameCommandHandler;