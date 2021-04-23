const PlayerFactory = require("../../model/factory/player");
const StoreSingleton = require("../../redux/storeSingleton");
const PlayerTypes = require("../../model/enum/playerType");
const {lobbyExists} = require("../util/lobbiesUtil");
const {getLobby} = require("../util/lobbiesUtil");
const {broadcastMessageOnLobbyPlayersChanged} = require("../util/broadcastUtil");

function joinLobbyHandler(socket, json) {
    let userType = getLobby(json.code).orderedUsers < 1 ? PlayerTypes.ADMIN : PlayerTypes.USER;
    let player = PlayerFactory.createPlayer(json.idUser, json.username, userType, socket);

    if(json.hasOwnProperty("code")){
        joinByCode(socket, json, player)
    } else if(json.hasOwnProperty("language")){
        joinByLanguage(socket, json, player)
    } else {
        socket.emit("joined", {error: "Fatal Error on message format"});
    }
}

function joinByCode(socket, json, player){
    if(lobbyExists(json.code)){
        getLobby(json.code).orderedUsers.push(player)
        let jsonToEmit = {
            lobbyCode: json.code,
            isAdmin: player.type,
            players: getLobby(json.code).orderedUsers.map(user => user.jsonToSend()),
            language: getLobby(json.code).language,
            nTurnsMax: getLobby(json.code).nTurnsMax,
            messages: getLobby(json.code).chat,
            isPublic: getLobby(json.code).isPublic
        }
        socket.emit("joined", jsonToEmit)
        broadcastMessageOnLobbyPlayersChanged(json.code)
        console.log(StoreSingleton.getInstance().getState().lobbies)
    } else {
        socket.emit("joined", {error: "No Lobby found"});
    }
}

function joinByLanguage(socket, json, player){
    /*
         let lobbies = StoreSingleton
             .getInstance()
             .getState()
             .lobbies.entries();
         let nextLobby = lobbies.next();
         let lobbyFilter = (lobby => (lobby.language === json.language) && (lobby.phase === PhaseTypes.INSIDE_LOBBY));
         do{
             if(!nextLobby.done){
                 console.log(nextLobby);
                 //TODO
             }
         }while(!nextLobby.done)
    */
}

module.exports = joinLobbyHandler;