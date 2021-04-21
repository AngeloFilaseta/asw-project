const StoreSingleton = require("../../redux/storeSingleton");

function getUserFromSocket(socket){
    let lobbies = StoreSingleton
        .getInstance()
        .getState()
        .lobbies.values();

    let nextLobby = lobbies.next();
    let userFilterPredicate = (u => u.socket === socket);
    do{
        if(!nextLobby.done){
            if(nextLobby.value.orderedUsers.filter(userFilterPredicate).length > 0 ){
                return nextLobby.value.orderedUsers.find(userFilterPredicate).jsonToSend()
            }
            nextLobby = lobbies.next();
        }
    }while(!nextLobby.done)
}

module.exports = {getUserFromSocket}