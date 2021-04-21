const LobbiesUtil = require("../util/lobbiesUtil");
const StoreSingleton = require("../../redux/storeSingleton");
const PhaseTypes = require("../../model/enum/phaseType");

function joinLobbyLanguageHandler(socket, json){
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
}

module.exports = joinLobbyLanguageHandler;