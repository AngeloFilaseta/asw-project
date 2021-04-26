import $ from "jquery"

export function sendMsg(dispatch, socket, username, lobbyCode, message) {
    let msgBody = {
        username: username,
        lobbyCode: lobbyCode,
        message: message
    }
    $("#chatSendButton").val(''); // reset buffer
    socket.emit("chat", msgBody)
}

export function beginGame(dispatch, socket, username, lobbyCode){
    socket.emit("startGame", {lobbyCode: lobbyCode})
    console.log("YOLO")
}

export function submitDraw(dispatch, socket, username, lobbyCode, xml){

}

export function submitSentence(dispatch, socket, username, lobbyCode, sentence){
    console.log(sentence)
}

export function sendEndReport(dispatch, socket, username, lobbyCode){

}