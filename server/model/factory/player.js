class Player{
    constructor(id, username, type){
        this.id = id;
        this.username = username;
        this.type = type;
    }
}

function createPlayer(id, username, type){
    return new Player(id,username, type)
}

module.exports = {createPlayer}