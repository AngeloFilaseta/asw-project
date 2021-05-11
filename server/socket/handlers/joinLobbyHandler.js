const PlayerFactory = require("../../model/factory/player");
const StoreSingleton = require("../../redux/storeSingleton");
const PlayerTypes = require("../../model/enum/playerType");
const PhaseTypes = require("../../model/enum/phaseType");
const Channels = require("../enum/channels");
const {lobbyExists} = require("../util/lobbiesUtil");
const {getLobby} = require("../util/lobbiesUtil");
const {broadcastMessageOnLobbyPlayersChanged} = require("../util/broadcastUtil");

function joinLobbyHandler(socket, json) {
    if(json.hasOwnProperty("code")){
        joinByCode(socket, json)
    } else if(json.hasOwnProperty("language")){
        joinByLanguage(socket, json)
    } else {
        socket.emit(Channels.JOINED, {error: "Fatal Error on message format"});
    }
}

function joinByCode(socket, json){
    if(lobbyExists(json.code)){
        joinLobby(socket, json, json.code)
    } else {
        socket.emit(Channels.JOINED, {error: "No Lobby found"});
    }
}

function joinByLanguage(socket, json){
    let lobbies = Array.from(StoreSingleton.getInstance().getState().lobbies.entries());
    lobbies = lobbies.filter(l => l[1].isPublic === true && l[1].language === json.language);
    while(lobbies.length > 0){
        let lobbyEntry = lobbies.splice(Math.floor(Math.random() * lobbies.length), 1)[0];
        let lobby = lobbyEntry[1];
        let lobbyCode = lobbyEntry[0];
        if(lobby.phase === PhaseTypes.INSIDE_LOBBY){
            joinLobby(socket, json, lobbyCode);
            return;
        }
    }
    socket.emit(Channels.JOINED, {error: "No Lobby found"});
}


function joinLobby(socket, json, code){
    let lobby = getLobby(code);
    if(isAlreadyInLobby(json.username, lobby)){
        socket.emit(Channels.JOINED, {error: "User already in Lobby"});
        return;
    }
    let userType = (getLobby(code).orderedUsers < 1) ? PlayerTypes.ADMIN : PlayerTypes.USER;
    let player = PlayerFactory.createPlayer(json.idUser, json.username, userType, socket);
    lobby.orderedUsers.push(player)
    let jsonToEmit = {
        lobbyCode: code,
        isAdmin: player.type,
        players: getLobby(code).orderedUsers.map(user => user.jsonToSend()),
        language: getLobby(code).language,
        nTurnsMax: getLobby(code).nTurnsMax,
        messages: getLobby(code).chat,
        isPublic: getLobby(code).isPublic
    }
    socket.emit(Channels.JOINED, jsonToEmit)
    broadcastMessageOnLobbyPlayersChanged(code)
}


function isAlreadyInLobby(username, lobby){
    return lobby.orderedUsers.find(u => u.username === username) !== undefined
}
module.exports = joinLobbyHandler;