const Channels = require("../enum/channels");
const {resetSubmittedAndSwapPhase} = require("../util/gameLogicUtil");
const {indexOfNextInputUser} = require("../util/gameLogicUtil");
const {getLobby} = require("../util/lobbiesUtil");
const {broadcastMessageOnLobby} = require("../util/broadcastUtil");
const {storeGame} = require("../../controller/resources");
const PhaseTypes = require("../../model/enum/phaseType");

function forwardDataHandler(socket, json){
    let lobby = getLobby(json)
    if (++lobby.nForwardAck === (lobby.orderedUsers.length * (lobby.orderedUsers.length - 1))){
        if(lobby.phase === PhaseTypes.SENTENCE){
            resetSubmittedAndSwapPhase(lobby)
            lobby.orderedUsers.forEach((user) => {
                let nextInputUserIndex = user.report.nextInputUsers[indexOfNextInputUser(lobby)]
                lobby.orderedUsers[nextInputUserIndex].socket.emit(Channels.SENTENCE, user.id)
            })
        } else {
            lobby.nTurns += 1
            if(lobby.nTurns === lobby.nTurnsMax){
                let reports = createReportsToSend(lobby.orderedUsers)
                lobby.phase = PhaseTypes.SHOWING_REPORT
                broadcastMessageOnLobby(lobby, Channels.SHOW_REPORT, "")
                storeGame(new Date(), new Date(), reports)
                    .then(() => console.log("Game saved successfully"))
                    .catch((err) => console.log("Error: " + err))
            } else {
                resetSubmittedAndSwapPhase(lobby)
                lobby.orderedUsers.forEach((user) => {
                    let nextInputUserIndex = user.report.nextInputUsers[indexOfNextInputUser(lobby)]
                    lobby.orderedUsers[nextInputUserIndex].socket.emit(Channels.DRAW, user.id)
                })
            }
        }
        
    }
}

function createReportsToSend(orderedUsers){
    let reports = []
    orderedUsers.forEach((user) => reports.push({id_user: user.id,
                                                 username: user.username,
                                                 sentences: user.report.sentences,
                                                 draws: user.report.images}))
    return reports
}

module.exports = forwardDataHandler