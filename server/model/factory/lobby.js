const PhaseTypes = require("../enum/phaseType");

class Lobby {
    constructor(admin, nTurnsMax, language, isPublic){
        this.userMap = new Map();
        this.orderedUsers= [admin];
        this.chat = [];
        this.nTurnsMax = nTurnsMax;
        this.nTurns = 0;
        this.nSubmitted = 0;
        this.phase = PhaseTypes.INSIDE_LOBBY;
        this.language = language;
        this.isPublic = isPublic;
    }
}

function createLobby(player, nTurnsMax, language, isPublic){
    return new Lobby(player, nTurnsMax, language, isPublic)
}

module.exports = {createLobby}

