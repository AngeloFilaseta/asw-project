const StoreSingleton = require("../../redux/storeSingleton");
const PhaseTypes = require("../../model/enum/phaseType");

function joinLobbyLanguageHandler(socket, json){
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
}

module.exports = joinLobbyLanguageHandler;