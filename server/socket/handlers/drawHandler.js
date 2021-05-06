const Channels = require("../enum/channels");
const {getLobby} = require("../util/lobbiesUtil");
const {findUserToUpdateReport} = require("../util/gameLogicUtil");

function drawHandler(socket, json){

    let lobby = getLobby(json.lobbyCode)
    addDrawToReport(lobby, json)
    lobby.nSubmitted += 1
    lobby.orderedUsers.forEach((user) => {
        if(user.id !== json.id_user){
            user.socket.emit(Channels.FORWARD_DATA, json)
        }
    })
}

function addDrawToReport(lobby, json) {
    findUserToUpdateReport(lobby, json).report.images.push(json.draw)
}

module.exports = drawHandler