const PlayerFactory = require("../../model/factory/player");
const StoreSingleton = require("../../redux/storeSingleton");
const PlayerTypes = require("../../model/enum/playerType");
const PhaseTypes = require("../../model/enum/phaseType");
const {lobbyExists} = require("../util/lobbiesUtil");
const {getLobby} = require("../util/lobbiesUtil");
const {broadcastMessageOnLobbyPlayersChanged} = require("../util/broadcastUtil");

function joinLobbyHandler(socket, json) {
    if(json.hasOwnProperty("code")){
        joinByCode(socket, json)
    } else if(json.hasOwnProperty("language")){
        joinByLanguage(socket, json)
    } else {
        socket.emit("joined", {error: "Fatal Error on message format"});
    }
}

function joinByCode(socket, json){
    if(lobbyExists(json.code)){
        joinLobby(socket, json, json.code)
    } else {
        socket.emit("joined", {error: "No Lobby found"});
    }
}

function joinByLanguage(socket, json){
    let lobbies = StoreSingleton.getInstance().getState().lobbies.entries();
    let nextLobby = lobbies.next();
    let lobbyCode;
    let lobby;
    do{
        if(!nextLobby.done){
            lobbyCode = nextLobby.value[0]
            lobby = nextLobby.value[1];
            if(lobby.language === json.language && lobby.phase === PhaseTypes.INSIDE_LOBBY && lobby.isPublic){
                joinLobby(socket, json, lobbyCode)
                return;
            }
            nextLobby = lobbies.next();
        }
    }while(!nextLobby.done)
    socket.emit("joined", {error: "No Lobby found"});
}


function joinLobby(socket, json, code){
    let userType = (getLobby(code).orderedUsers < 1) ? PlayerTypes.ADMIN : PlayerTypes.USER;
    let player = PlayerFactory.createPlayer(json.idUser, json.username, userType, socket);
    getLobby(code).orderedUsers.push(player)
    let jsonToEmit = {
        lobbyCode: code,
        isAdmin: player.type,
        players: getLobby(code).orderedUsers.map(user => user.jsonToSend()),
        language: getLobby(code).language,
        nTurnsMax: getLobby(code).nTurnsMax,
        messages: getLobby(code).chat,
        isPublic: getLobby(code).isPublic
    }
    socket.emit("joined", jsonToEmit)
    broadcastMessageOnLobbyPlayersChanged(code)
}

module.exports = joinLobbyHandler;