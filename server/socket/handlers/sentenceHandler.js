const Channels = require("../enum/channels");
const {resetSubmittedAndSwapPhase} = require("../util/gameLogicUtil");
const {indexOfNextInputUser} = require("../util/gameLogicUtil");
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
    /*if(lobby.nSubmitted === lobby.orderedUsers.length){
        resetSubmittedAndSwapPhase(lobby)
        lobby.orderedUsers.forEach((user) => {
            let nextInputUserIndex = user.report.nextInputUsers[indexOfNextInputUser(lobby)]
            lobby.orderedUsers[nextInputUserIndex].socket.emit(Channels.SENTENCE, user.report.sentences[user.report.sentences.length - 1])
        })
    }*/
}

function addSentenceToReport(lobby, json) {
    findUserToUpdateReport(lobby, json).report.sentences.push(json.sentence)
}

module.exports = sentenceHandler