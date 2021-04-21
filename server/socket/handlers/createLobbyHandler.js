const LobbyCodeGenerator = require("../../util/LobbyCodeGenerator");
const LobbiesUtil = require("../util/lobbiesUtil");
const StoreSingleton = require("../../redux/storeSingleton");
const PlayerFactory = require("../../model/factory/player");
const LobbyFactory = require("../../model/factory/lobby");
const LobbiesAction = require("../../redux/lobbies/actions");
const PlayerTypes = require("../../model/enum/playerType");

function createLobbyHandler(socket, json) {
    let lobbyCode; //TODO CHECK CONCURRENCY
    do{
        lobbyCode = LobbyCodeGenerator.generateRandomCode();
    }while(LobbiesUtil.lobbyExists(lobbyCode));
    let newLobbyAdmin = PlayerFactory.createPlayer(json.idUser, json.username, PlayerTypes.ADMIN, socket)
    let newLobby = LobbyFactory.createLobby(newLobbyAdmin, json.nTurnsMax, json.language, json.isPublic)
    StoreSingleton.getInstance().dispatch(LobbiesAction.put(lobbyCode, newLobby));
    socket.emit("joined", lobbyCode);
    console.log(StoreSingleton.getInstance().getState().lobbies)
}

module.exports = createLobbyHandler;