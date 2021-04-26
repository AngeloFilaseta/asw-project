const PhaseTypes = require("../../model/enum/phaseType");
const {createInitialReport} = require("../util/gameLogicUtil");
const {broadcastMessageOnLobby} = require("../util/broadcastUtil");
const {getLobby} = require("../util/lobbiesUtil");
const {initializeNextInputUsers} = require("../util/gameLogicUtil");

function startGameHandler(socket, json){
    let lobbyCode = json.lobbyCode
    createInitialReport(getLobby(lobbyCode).orderedUsers)
    initializeNextInputUsers(lobbyCode)
    let lobby = getLobby(lobbyCode)
    lobby.phase = PhaseTypes.SENTENCE
    broadcastMessageOnLobby(lobby, "draw", "")
}

module.exports = startGameHandler;