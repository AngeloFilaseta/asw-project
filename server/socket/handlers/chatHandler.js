const ChatMessageFactory = require("../../model/factory/chatMessage");
const StoreSingleton = require("../../redux/storeSingleton");
const BroadCastUtil = require("../util/broadcastUtil");
const {lobbyExists} = require("../util/lobbiesUtil");
const {getLobby} = require("../util/lobbiesUtil");

function chatHandler(socket, json){
    if(lobbyExists(json.lobbyCode)){
        let message = ChatMessageFactory.createChatMessage(json.username, json.message);
        StoreSingleton.getInstance()
            .getState()
            .lobbies
            .get(json.lobbyCode)
            .chat.push(message);
        BroadCastUtil.broadcastMessageOnLobby(getLobby(json.lobbyCode), "chat", getLobby(json.lobbyCode).chat);
    }else{
        socket.emit("chat", {error: "We're sorry, an error occurred, maybe the lobby was closed."})
    }
}

module.exports = chatHandler