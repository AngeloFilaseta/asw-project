const Channels = require("../enum/channels");
const SocketUtil = require("../util/general");
const {getLobby} = require("../util/lobbiesUtil");
const PlayerTypes = require("../../model/enum/playerType");
const PhaseTypes = require("../../model/enum/phaseType");
const {goToShowReportAndStoreGame} = require("../util/gameLogicUtil");
const {broadcastMessageOnLobby} = require("../util/broadcastUtil");
const {lobbyExists} = require("../util/lobbiesUtil");
const {removeFromArrayByAttr} = require("../../util/Structures");
const {broadcastMessageOnLobbyPlayersChanged} = require("../util/broadcastUtil");
const {deleteLobbyAndDisconnectEveryone} = require("../util/lobbiesUtil");

function disconnectHandler(socket) {
    let lobbyAndUser = SocketUtil.getUserFromSocket(socket);
    disconnectFromLobby(socket, lobbyAndUser)
}

function disconnectFromLobby(socket, lobbyAndUser){
    try {
        let code = lobbyAndUser.lobbyCode;
        if(lobbyExists(code)){
            let lobby = getLobby(code);
            if(lobby.orderedUsers.length === 1){
                deleteLobbyAndDisconnectEveryone(code);
                return;
            }
            let player = lobbyAndUser.player;
            let phase = lobby.phase
            if(phase === PhaseTypes.DRAW || phase === PhaseTypes.SENTENCE){ //we are in game
                goToShowReportAndStoreGame(lobby)
                broadcastMessageOnLobby(lobby, Channels.SHOW_REPORT, null)
            }
            removeFromArrayByAttr(lobby.orderedUsers, 'username', player.username);
            if(player.type === PlayerTypes.ADMIN && lobby.orderedUsers.length > 0){ //if the player was the admin assign a new admin
                lobby.orderedUsers[0].type = PlayerTypes.ADMIN;
            }
            broadcastMessageOnLobbyPlayersChanged(code);
        }
    } catch (error) {
        console.log("ERROR CAUGHT ON DISCONNECT FROM LOBBY:\n" + error)
    }
}


module.exports = disconnectHandler