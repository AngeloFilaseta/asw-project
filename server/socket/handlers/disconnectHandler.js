const Channels = require("../enum/channels");
const SocketUtil = require("../util/general");
const {getLobby} = require("../util/lobbiesUtil");
const PlayerTypes = require("../../model/enum/playerType");
const PhaseTypes = require("../../model/enum/phaseType");
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
    let code = lobbyAndUser.lobbyCode;
    if(lobbyExists(code)){
        if(getLobby(code).orderedUsers.length === 1){
            deleteLobbyAndDisconnectEveryone(code);
            return;
        }
        let player = lobbyAndUser.player;
        let phase = getLobby(code).phase
        removeFromArrayByAttr(getLobby(code).orderedUsers, 'username', player.username);
        if(player.type === PlayerTypes.ADMIN){ //if the player was the admin assign a new admin
            getLobby(code).orderedUsers[0].type = PlayerTypes.ADMIN;
        }
        if(phase === PhaseTypes.DRAW || phase === PhaseTypes.SENTENCE){ //we are in game
            broadcastMessageOnLobby(getLobby(code), Channels.SHOW_REPORT, null)
        }
        broadcastMessageOnLobbyPlayersChanged(code)
    }
}


module.exports = disconnectHandler