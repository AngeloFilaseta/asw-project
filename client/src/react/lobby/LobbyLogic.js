import $ from "jquery"
import { setMessages } from "../../redux/lobby/actions"

export function sendMsg(dispatch, socket, username, lobbyCode, msg) {
    dispatch(setMessages([{username: "dizi", msg: "KONO DIO DA"}]))
    /*var msgBody = {
        username: username,
        code: lobbyCode,
        msg: msg
    }
    $("#chatSendButton").val('');
    eventbus.send('chat', msgBody);*/
}