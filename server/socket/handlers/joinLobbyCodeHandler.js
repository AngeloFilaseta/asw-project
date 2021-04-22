const LobbiesUtil = require("../util/lobbiesUtil");
const PlayerFactory = require("../../model/factory/player");
const StoreSingleton = require("../../redux/storeSingleton");
const BroadCastUtil = require("../util/broadcastUtil");
const PlayerTypes = require("../../model/enum/playerType");
const {broadcastMessageOnLobbyPlayersChanged} = require("../util/broadcastUtil");

function joinLobbyCodeHandler(socket, json) {
    if(LobbiesUtil.lobbyExists(json.code)){
        let player = PlayerFactory.createPlayer(json.idUser, json.username, PlayerTypes.USER, socket)
        StoreSingleton.getInstance().getState().lobbies.get(json.code).orderedUsers.push(player)
        let jsonToEmit = {
            lobbyCode: json.code,
            players: StoreSingleton.getInstance().getState().lobbies.get(json.code).orderedUsers.map(user => user.jsonToSend()),
            language: StoreSingleton.getInstance().getState().lobbies.get(json.code).language,
            nTurnsMax: StoreSingleton.getInstance().getState().lobbies.get(json.code).nTurnsMax,
            isPublic: StoreSingleton.getInstance().getState().lobbies.get(json.code).isPublic
        }
        socket.emit("joined", jsonToEmit)
        broadcastMessageOnLobbyPlayersChanged(json.code)
        console.log(StoreSingleton.getInstance().getState().lobbies)
    } else {
        socket.emit("joined", {error: "No Lobby found"});
    }
}

module.exports = joinLobbyCodeHandler;