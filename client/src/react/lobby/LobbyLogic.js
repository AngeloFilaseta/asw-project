import $ from "jquery"
import { addSentence, addDraw } from "../../redux/lobby/actions";

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

export function submitDraw(dispatch, socket, id_user, id_report, lobbyCode, svgString){
    let msgBody = {
        id_user: id_user,
        id_report: id_report,
        lobbyCode: lobbyCode,
        draw: svgString
    }
    $("#submit").prop("disabled", true)
    $("#submittedSentence").append("You submitted your sentence. Wait for other players.")
    dispatch(addDraw(msgBody))
    socket.emit("draw", msgBody)
}

export function submitSentence(dispatch, socket, id_user, id_report, lobbyCode, sentence) {
    let msgBody = {
        id_user: id_user,
        id_report: id_report == undefined || id_report == null || id_report === "" ? id_user : id_report,
        lobbyCode: lobbyCode,
        sentence: sentence
    }
    $("#submitDraw").prop("disabled", true)
    $("#submittedDraw").append("You submitted your Draw. Wait for other players.")
    dispatch(addSentence(msgBody))
    socket.emit("sentence", msgBody)
}


export function sendEndReport(dispatch, socket, id_user, lobbyCode) {
    socket.emit("endGameCommand", lobbyCode)

}

