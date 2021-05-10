const Channels = require("../enum/channels");
const {findUserToUpdateReport} = require("../util/gameLogicUtil");
const {getLobby} = require("../util/lobbiesUtil");

function sentenceHandler(socket, json){
    let lobby = getLobby(json.lobbyCode)
    addSentenceToReport(lobby, json)
    lobby.nSubmitted += 1
    lobby.orderedUsers.forEach((user) => {
        if(user.id !== json.id_user){
            user.socket.emit(Channels.FORWARD_DATA, json)
        }
    })
}

function addSentenceToReport(lobby, json) {
    findUserToUpdateReport(lobby, json).report.sentences.push(json.sentence)
}

module.exports = sentenceHandler