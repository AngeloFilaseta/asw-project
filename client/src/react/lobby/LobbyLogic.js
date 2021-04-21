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

export function beginGame(dispatch, socket, username, lobbyCode){
    
}

export function submitDraw(dispatch, socket, username, lobbyCode, xml){

}