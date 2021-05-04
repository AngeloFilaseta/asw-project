const PhaseTypes = require("../enum/phaseType");

class Lobby {
    constructor(nTurnsMax, language, isPublic){
        this.orderedUsers = [];
        this.chat = [];
        this.nTurnsMax = nTurnsMax;
        this.nTurns = 0;
        this.nSubmitted = 0;
        this.nForwardAck = 0;
        this.phase = PhaseTypes.INSIDE_LOBBY;
        this.language = language;
        this.isPublic = isPublic;
    }
}

function createLobby(nTurnsMax, language, isPublic){
    return new Lobby(nTurnsMax, language, isPublic)
}

module.exports = {createLobby}

