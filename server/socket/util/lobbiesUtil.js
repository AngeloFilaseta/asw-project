const StoreSingleton = require("../../redux/storeSingleton");

function lobbyExists(lobbyCode){
    return StoreSingleton.getInstance().getState().lobbies.has(lobbyCode)
}

function getLobby(lobbyCode){
    return StoreSingleton.getInstance().getState().lobbies.get(lobbyCode);
}

module.exports = {
    getLobby, lobbyExists
}