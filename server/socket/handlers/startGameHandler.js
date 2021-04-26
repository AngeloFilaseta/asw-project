const {getLobby} = require("../util/lobbiesUtil");
const {initializeNextInputUsers} = require("../util/gameLogicUtil");

function startGameHandler(socket, json){
    initializeNextInputUsers(json.lobbyCode)
    console.log(getLobby(json.lobbyCode).orderedUsers.map(u => u.report.nextInputUsers))
}

module.exports = startGameHandler;