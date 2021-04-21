class ChatMessage{
    constructor(username, message){
        this.username = username;
        this.message = message;
    }
}

function createChatMessage(username, message){
    return new ChatMessage(username, message)
}

module.exports = {createChatMessage}