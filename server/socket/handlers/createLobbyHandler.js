const LobbyCodeGenerator = require("../../util/LobbyCodeGenerator");
const LobbiesUtil = require("../util/lobbiesUtil");
const StoreSingleton = require("../../redux/storeSingleton");
const PlayerFactory = require("../../model/factory/player");
const LobbyFactory = require("../../model/factory/lobby");
const LobbiesAction = require("../../redux/lobbies/actions");
const PlayerTypes = require("../../model/enum/playerType");
const joinLobbyHandler = require("./joinLobbyHandler");

function createLobbyHandler(socket, json) {
    let lobbyCode;
    do{
        lobbyCode = LobbyCodeGenerator.generateRandomCode();
    }while(LobbiesUtil.lobbyExists(lobbyCode));
    let newLobby = LobbyFactory.createLobby(json.nTurnsMax, json.language, json.isPublic)
    StoreSingleton.getInstance().dispatch(LobbiesAction.put(lobbyCode, newLobby));
    //Join The lobby created directly
    joinLobbyHandler(socket,{idUser: json.idUser,
                                  username: json.username,
                                  code: lobbyCode})
}

module.exports = createLobbyHandler;