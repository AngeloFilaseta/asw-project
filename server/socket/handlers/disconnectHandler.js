const SocketUtil = require("../util/general");

function disconnectHandler(socket) {
    let user = SocketUtil.getUserFromSocket(socket);
    disconnectFromLobby(user)
}

function disconnectFromLobby(user){
    //TODO
}


module.exports = disconnectHandler