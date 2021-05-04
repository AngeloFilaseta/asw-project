const Channels = require("../enum/channels");
const {storeGame} = require("../../controller/resources");
const {broadcastMessageOnLobby} = require("../util/broadcastUtil");
const {getLobby} = require("../util/lobbiesUtil");
const {indexOfNextInputUser} = require("../util/gameLogicUtil");
const {resetSubmittedAndSwapPhase} = require("../util/gameLogicUtil");
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

    /*let lobby = getLobby(json.lobbyCode)
    addDrawToReport(lobby, json)
    lobby.nSubmitted += 1
    if(lobby.nSubmitted === lobby.orderedUsers.length){
        lobby.nTurns += 1
        if(lobby.nTurns === lobby.nTurnsMax){
            let reports = createReportsToSend(lobby.orderedUsers)
            broadcastMessageOnLobby(lobby, Channels.SHOW_REPORT, reports)
            storeGame(new Date(), new Date(), reports)
                .then(() => console.log("Game saved successfully"))
                .catch((err) => console.log("Error: " + err))
        } else {
            resetSubmittedAndSwapPhase(lobby)
            lobby.orderedUsers.forEach((user) => {
                let nextInputUserIndex = user.report.nextInputUsers[indexOfNextInputUser(lobby)]
                lobby.orderedUsers[nextInputUserIndex].socket.emit(Channels.DRAW, user.report.images[user.report.images.length - 1])
            })

        }
    }*/
}

function addDrawToReport(lobby, json) {
    findUserToUpdateReport(lobby, json).report.images.push(json.draw)
}

function createReportsToSend(orderedUsers){
    let reports = []
    orderedUsers.forEach((user) => reports.push({id_user: user.id,
                                                 username: user.username,
                                                 sentences: user.report.sentences,
                                                 draws: user.report.images}))
    return reports
}

module.exports = drawHandler