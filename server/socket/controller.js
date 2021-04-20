const LobbyCodeGenerator = require("../util/LobbyCodeGenerator");
const StoreSingleton = require("../redux/storeSingleton")
const LobbyFactory = require("../model/factory/lobby")
const PlayerFactory = require("../model/factory/player")
const PlayerTypes = require("../model/enum/playerType")
const LobbiesAction = require("../redux/lobbies/actions")

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log("client connected");

        socket.on('createLobby', (json) => {
            let lobbyCode; //TODO CHECK CONCURRENCY
            do{
                lobbyCode = LobbyCodeGenerator.generateRandomCode();
            }while(StoreSingleton.getInstance().getState().lobbies.has(lobbyCode));
            let newLobbyAdmin = PlayerFactory.createPlayer(json.idUser, json.username, PlayerTypes.ADMIN)
            let newLobby = LobbyFactory.createLobby(newLobbyAdmin, json.nTurnsMax, json.language, json.isPublic)
            StoreSingleton.getInstance().dispatch(LobbiesAction.put(lobbyCode, newLobby));
            socket.emit("lobbyCode", lobbyCode);
            console.log(StoreSingleton.getInstance().getState().lobbies)
        });

        socket.on('joinLobby', (lobbyCode) => {


        });
    });
};

