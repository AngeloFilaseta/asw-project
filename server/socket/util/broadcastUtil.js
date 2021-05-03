const Channels = require("../enum/channels");
const {getLobby} = require("./lobbiesUtil");

function broadcastMessage(sockets, channel, message){
    sockets.forEach(s => s.emit(channel, message));
}

function broadcastMessageOnLobby(lobby, channel, message){
    let sockets = lobby.orderedUsers.map(u => u.socket);
    broadcastMessage(sockets, channel, message)
}

function broadcastMessageOnLobbyPlayersChanged(code){
    broadcastMessageOnLobby(
        getLobby(code),
        Channels.PLAYERS,
        getLobby(code).orderedUsers.map(user => user.jsonToSend()));
}

module.exports = {
    broadcastMessage, broadcastMessageOnLobby, broadcastMessageOnLobbyPlayersChanged
}
