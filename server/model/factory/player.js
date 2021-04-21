class Player{
    constructor(id, username, type, socket){
        this.id = id;
        this.username = username;
        this.type = type;
        this.socket = socket;
    }

    get jsonToSend() {
        return {
            id: this.id,
            username: this.username,
            type: this.type
        }
      }
}

function createPlayer(id, username, type, socket){
    return new Player(id,username, type, socket)
}

module.exports = {createPlayer}