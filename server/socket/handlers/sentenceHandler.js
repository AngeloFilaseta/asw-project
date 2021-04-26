const {resetSubmittedAndSwapPhase} = require("../util/gameLogicUtil");
const {indexOfNextInputUser} = require("../util/gameLogicUtil");
const {findUserToUpdateReport} = require("../util/gameLogicUtil");
const {getLobby} = require("../util/lobbiesUtil");

function sentenceHandler(socket, json){
    let lobby = getLobby(json.lobbyCode)
    addSentenceToReport(lobby, json)
    lobby.nSubmitted += 1
    console.log(lobby.nSubmitted,lobby.orderedUsers.length )
    if(lobby.nSubmitted === lobby.orderedUsers.length){
        console.log("SENTENCE PHASE OVER")
        resetSubmittedAndSwapPhase(lobby)
        lobby.orderedUsers.forEach((user) => {
            let nextInputUserIndex = user.report.nextInputUsers[indexOfNextInputUser(lobby)]
            lobby.orderedUsers[nextInputUserIndex].socket.emit("sentence", user.report.sentences[user.report.sentences.length - 1])
        })
    }
}

function addSentenceToReport(lobby, json) {
    findUserToUpdateReport(lobby, json).report.sentences.push(json.sentence)
}

module.exports = sentenceHandler