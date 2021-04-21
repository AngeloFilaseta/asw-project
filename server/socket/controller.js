const PhaseTypes = require("../model/enum/phaseType");
const LobbyCodeGenerator = require("../util/LobbyCodeGenerator");
const StoreSingleton = require("../redux/storeSingleton")
const LobbyFactory = require("../model/factory/lobby")
const PlayerFactory = require("../model/factory/player")
const PlayerTypes = require("../model/enum/playerType")
const LobbiesAction = require("../redux/lobbies/actions")
const ChatMessageFactory = require("../model/factory/chatMessage")
const LobbiesUtil = require("./util/lobbiesUtil");
const BroadCastUtil = require("./util/broadcastUtil");

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log("client connected");

        socket.on('createLobby', (json) => {
            let lobbyCode; //TODO CHECK CONCURRENCY
            do{
                lobbyCode = LobbyCodeGenerator.generateRandomCode();
            }while(LobbiesUtil.lobbyExists(lobbyCode));
            let newLobbyAdmin = PlayerFactory.createPlayer(json.idUser, json.username, PlayerTypes.ADMIN, socket)
            let newLobby = LobbyFactory.createLobby(newLobbyAdmin, json.nTurnsMax, json.language, json.isPublic)
            StoreSingleton.getInstance().dispatch(LobbiesAction.put(lobbyCode, newLobby));
            socket.emit("joined", lobbyCode);
            console.log(StoreSingleton.getInstance().getState().lobbies)
        });

        socket.on('joinLobbyCode', (json) => {
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
                console.log(StoreSingleton.getInstance().getState().lobbies)
            } else {
                socket.emit("joined", {error: "No Lobby found"});
            }
        });

        socket.on('joinLobbyLanguage', (json) => {
            let sameLanguagesLobbiesMap = StoreSingleton
                                        .getInstance()
                                        .getState()
                                        .lobbies
                                        .filter(([key, lobby]) => lobby.language === json.language && lobby.phase === PhaseTypes.INSIDE_LOBBY);
           if(sameLanguagesLobbiesMap.length > 0){
               let lobbyCode;
               do {
                   lobbyCode = sameLanguagesLobbiesMap.keys().next()
               }while(!LobbiesUtil.lobbyExists(lobbyCode))
               let lobbyFound = StoreSingleton
                   .getInstance()
                   .getState()
                   .lobbies.get(lobbyCode)
               console.log(StoreSingleton.getInstance().getState().lobbies)
            } else {
                socket.emit("joined", {error: "No Lobby found"});
            }
        });

        socket.on('chat', function(json){
            if(LobbiesUtil.lobbyExists(json.lobbyCode)){
                let message = ChatMessageFactory.createChatMessage(json.username, json.message);
                StoreSingleton.getInstance()
                    .getState()
                    .lobbies
                    .get(json.lobbyCode)
                    .chat.push(message);
                BroadCastUtil.broadcastMessageOnLobby(LobbiesUtil.getLobby(json.lobbyCode), "chat", message);
            }else{
                socket.emit("chat", {error: "We're sorry, an error occurred, maybe the lobby was closed."})
            }
        });

        socket.on('disconnect', function(){
            console.log('user disconnected'); //TODO CHECKS
        });

        socket.on
    });
};

