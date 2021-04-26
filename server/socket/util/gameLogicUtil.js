const ReportFactory = require("../../model/factory/report");

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

function updateReports(orderedUsers){
    let orderedNext = orderedUsers.map(u => u.report.nextInputUser)
}

module.exports = {initializeNextInputUsers}