const SocketUtil = require("../util/general");
const StoreSingleton = require("../../redux/storeSingleton");
const {getLobby} = require("../util/lobbiesUtil");
const PlayerTypes = require("../../model/enum/playerType");
const PhaseTypes = require("../../model/enum/phaseType");
const {removeFromArrayByAttr} = require("../../util/Structures");
const {broadcastMessageOnLobbyPlayersChanged} = require("../util/broadcastUtil");
const {deleteLobbyAndDisconnectEveryone} = require("../util/lobbiesUtil");
const MIN_PLAYERS = require("../../conf/conf").min_player;

function disconnectHandler(socket) {
    let lobbyAndUser = SocketUtil.getUserFromSocket(socket);
    disconnectFromLobby(socket, lobbyAndUser)
}

function disconnectFromLobby(socket, lobbyAndUser){
    let code = lobbyAndUser.lobbyCode;
    if(getLobby(code).orderedUsers.length === 1){
        deleteLobbyAndDisconnectEveryone(code);
        return;
    }
    let player = lobbyAndUser.player;
    removeFromArrayByAttr(StoreSingleton.getInstance().getState().lobbies.get(code).orderedUsers, 'username', player.username);
    if(player.type === PlayerTypes.ADMIN){
        StoreSingleton.getInstance().getState().lobbies.get(code).orderedUsers[0].type = PlayerTypes.ADMIN;
    }
    let phase = getLobby(code).phase
    if( phase === PhaseTypes.DRAW || phase === PhaseTypes.SENTENCE){
        if(getLobby(code).orderedUsers < MIN_PLAYERS) {
            deleteLobbyAndDisconnectEveryone(code);
        } else {
            // TODO REMOVE REPORT
        }
    }
    broadcastMessageOnLobbyPlayersChanged(code)
}


module.exports = disconnectHandler