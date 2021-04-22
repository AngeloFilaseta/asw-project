const StoreSingleton = require("../../redux/storeSingleton");

function getLobbyAndUserFromSocket(socket){
    let lobbies = StoreSingleton
        .getInstance()
        .getState()
        .lobbies.entries();

    let lobbyCode;
    let nextLobby = lobbies.next();
    let userFilterPredicate = (u => u.socket === socket);
    do{
        if(!nextLobby.done){
            lobbyCode = nextLobby.value[0]
            if(nextLobby.value[1].orderedUsers.filter(userFilterPredicate).length > 0){
                return {
                    lobbyCode: lobbyCode,
                    player: nextLobby.value[1].orderedUsers.find(userFilterPredicate).jsonToSend()
                }
            }
            nextLobby = lobbies.next();
        }
    }while(!nextLobby.done)
}

module.exports = {getUserFromSocket: getLobbyAndUserFromSocket}