function broadcastMessage(sockets, channel, message){
    sockets.forEach(s => s.emit(channel, message));
}

function broadcastMessageOnLobby(lobby, channel, message){
    let sockets = lobby.orderedUsers.map(u => u.socket);
    broadcastMessage(sockets, channel, message)
}

module.exports = {
    broadcastMessage, broadcastMessageOnLobby
}
