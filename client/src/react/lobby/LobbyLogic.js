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
}

export function submitDraw(dispatch, socket, id_user, lobbyCode, svgString){
    let msgBody = {
        id_user: id_user,
        lobbyCode: lobbyCode,
        draw: svgString
    }
    $("#submit").prop("disabled", true)
    $("#submittedSentence").append("You submitted your sentence. Wait for other players.")
    socket.emit("draw", msgBody)
}

export function submitSentence(dispatch, socket, id_user, lobbyCode, sentence) {
    let msgBody = {
        id_user: id_user,
        lobbyCode: lobbyCode,
        sentence: sentence
    }
    $("#submitDraw").prop("disabled", true)
    $("#submittedDraw").append("You submitted your Draw. Wait for other players.")
    socket.emit("sentence", msgBody)
}

