const LobbiesUtil = require("../util/lobbiesUtil");
const ChatMessageFactory = require("../../model/factory/chatMessage");
const StoreSingleton = require("../../redux/storeSingleton");
const BroadCastUtil = require("../util/broadcastUtil");

function chatHandler(socket, json){
    if(LobbiesUtil.lobbyExists(json.lobbyCode)){
        let message = ChatMessageFactory.createChatMessage(json.username, json.message);
        StoreSingleton.getInstance()
            .getState()
            .lobbies
            .get(json.lobbyCode)
            .chat.push(message);
        BroadCastUtil.broadcastMessageOnLobby(LobbiesUtil.getLobby(json.lobbyCode), "chat", message);
    }else{
        socket.emit("chat", {error: "We're sorry, an error occurred, maybe the lobby was closed."})
    }
}