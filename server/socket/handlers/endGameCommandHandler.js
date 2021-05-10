const Channels = require("../enum/channels");
const PhaseTypes = require("../../model/enum/phaseType");
const {broadcastMessageOnLobby} = require("../util/broadcastUtil");
const {getLobby} = require("../util/lobbiesUtil");

function endGameCommandHandler(socket, lobbyCode) {
    let lobby = getLobby(lobbyCode)
    lobby.nTurns = 0
    lobby.nSubmitted = 0;
    lobby.nForwardAck = 0;
    lobby.phase = PhaseTypes.INSIDE_LOBBY;
    broadcastMessageOnLobby(lobby, Channels.BACK_TO_LOBBY, undefined)
}

module.exports = endGameCommandHandler;