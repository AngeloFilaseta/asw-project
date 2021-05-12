const Channels = require("../enum/channels");
const {resetSubmittedAndSwapPhase} = require("../util/gameLogicUtil");
const {indexOfNextInputUser} = require("../util/gameLogicUtil");
const {getLobby} = require("../util/lobbiesUtil");
const PhaseTypes = require("../../model/enum/phaseType");
const {goToShowReportAndStoreGame} = require("../util/gameLogicUtil");

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
                goToShowReportAndStoreGame(lobby)
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

module.exports = forwardDataHandler