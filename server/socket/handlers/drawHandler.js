const {broadcastMessageOnLobby} = require("../util/broadcastUtil");
const {getLobby} = require("../util/lobbiesUtil");
const {indexOfNextInputUser} = require("../util/gameLogicUtil");
const {resetSubmittedAndSwapPhase} = require("../util/gameLogicUtil");
const {findUserToUpdateReport} = require("../util/gameLogicUtil");

function drawHandler(socket, json){
    let lobby = getLobby(json.lobbyCode)
    addDrawToReport(lobby, json)
    lobby.nSubmitted += 1
    if(lobby.nSubmitted === lobby.orderedUsers.length){
        lobby.nTurns += 1
        if(lobby.nTurns === lobby.nTurnsMax){
            broadcastMessageOnLobby(lobby, "showReport", createReportsToSend(lobby.orderedUsers))
        } else {
            resetSubmittedAndSwapPhase(lobby)
            lobby.orderedUsers.forEach((user) => {
                let nextInputUserIndex = user.report.nextInputUsers[indexOfNextInputUser(lobby)]
                lobby.orderedUsers[nextInputUserIndex].socket.emit("draw", user.report.images[user.report.images.length - 1])
            })

        }
    }
}

function addDrawToReport(lobby, json) {
    findUserToUpdateReport(lobby, json).report.images.push(json.draw)
}

function createReportsToSend(orderedUsers){
    let reports = []
    orderedUsers.forEach((user) => reports.push({username: user.username,
                                                 sentences: user.report.sentences,
                                                 draws: user.report.images}))
    return reports
}

module.exports = drawHandler