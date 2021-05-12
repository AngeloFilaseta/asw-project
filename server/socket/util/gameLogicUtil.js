const ReportFactory = require("../../model/factory/report");
const PhaseType = require("../../model/enum/phaseType");
const PhaseTypes = require("../../model/enum/phaseType");
const Channels = require("../enum/channels");
const {storeGame} = require("../../controller/resources");
const {broadcastMessageOnLobby} = require("./broadcastUtil");

const {getLobby} = require("./lobbiesUtil");

function initializeNextInputUsers(lobbyCode){
    let lobby = getLobby(lobbyCode)
    let orderedUsers = lobby.orderedUsers
    let nTurnsMax = lobby.nTurnsMax
    orderedUsers.forEach((user, index) => {
        let nextInputUsers = []
        for(let j = 0; j < nTurnsMax * 2 ; j++){
            nextInputUsers.push((index + j) % orderedUsers.length)
        }
        user.report.nextInputUsers =  nextInputUsers
    })
}

function createInitialReport(orderedUsers){
    orderedUsers.forEach(u => u.report = ReportFactory.createReport(u.id))
}

function findUserToUpdateReport(lobby, json){
    let indexOfSender = lobby.orderedUsers.findIndex((user) => user.id === json.id_user)
    let indexOfUserReportToUpdate = lobby.orderedUsers.findIndex((user) => user.report.nextInputUsers[indexOfNextInputUser(lobby)] === indexOfSender)
    return lobby.orderedUsers[indexOfUserReportToUpdate]
}

function indexOfNextInputUser(lobby){
    return (lobby.nTurns * 2) + (lobby.phase === PhaseType.DRAW)
}

function resetSubmittedAndSwapPhase(lobby){
    lobby.nSubmitted = 0
    lobby.nForwardAck = 0
    lobby.phase = lobby.phase === PhaseType.DRAW ? PhaseType.SENTENCE : PhaseType.DRAW
}

function goToShowReportAndStoreGame(lobby) {
    let reports = createReportsToSend(lobby.orderedUsers)
    lobby.phase = PhaseTypes.SHOWING_REPORT
    broadcastMessageOnLobby(lobby, Channels.SHOW_REPORT, "")
    storeGame(new Date(), new Date(), reports)
        .then(() => console.log("Game saved successfully"))
        .catch((err) => console.log("Error: " + err))
}

function createReportsToSend(orderedUsers){
    let reports = []
    orderedUsers.forEach((user) => reports.push({id_user: user.id,
        username: user.username,
        sentences: user.report.sentences,
        draws: user.report.images}))
    return reports
}

module.exports = {initializeNextInputUsers,
                  createInitialReport,
                  findUserToUpdateReport,
                  goToShowReportAndStoreGame,
                  indexOfNextInputUser,
                  resetSubmittedAndSwapPhase}