import {addDraw, addSentence} from "../../redux/lobby/actions";
import SubmissionSound from "../../sound/submission.mp3";
import {NotificationManager} from "react-notifications";
import {Channels} from "../enum/channels";

export function forwardDataHandler(state, msg, dispatch, socket) {
    let sender = state.lobby.info.users.filter(u => u.id === msg.id_user)
    let areAllDataForwarded = false
    if(msg.sentence !== undefined){
        dispatch(addSentence(msg))
        areAllDataForwarded = state.lobby.reports.filter(r => r.sentence.length !== r.draw.length).length === state.lobby.reports.length
    } else {
        dispatch(addDraw(msg))
        areAllDataForwarded = state.lobby.reports.filter(r => r.sentence.length === r.draw.length).length === state.lobby.reports.length
    }
    if(sender.length && !areAllDataForwarded> 0){
        new Audio(SubmissionSound).play().then(/* does nothing */)
        NotificationManager.info(sender[0].username + " has submitted", '', 1500)
    }
    socket.emit(Channels.FORWARD_DATA, msg.lobbyCode)
}