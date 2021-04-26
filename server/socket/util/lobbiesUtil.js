const StoreSingleton = require("../../redux/storeSingleton");
const LobbiesAction = require("../../redux/lobbies/actions");

function lobbyExists(lobbyCode){
    return StoreSingleton.getInstance().getState().lobbies.has(lobbyCode)
}

function getLobby(lobbyCode){
    return StoreSingleton.getInstance().getState().lobbies.get(lobbyCode);
}

function deleteLobbyAndDisconnectEveryone(lobbyCode){
    getLobby(lobbyCode).orderedUsers.map(u => u.socket).forEach(s => s.disconnect())
    StoreSingleton.getInstance().dispatch(LobbiesAction.remove(lobbyCode));
}


module.exports = {
    getLobby, lobbyExists, deleteLobbyAndDisconnectEveryone
}