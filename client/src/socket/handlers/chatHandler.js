import NewMsgSound from "../../sound/new_msg.mp3";
import {setMessages} from "../../redux/lobby/actions";

export function chatHandler(state, messages, dispatch) {
    if(messages[messages.length - 1].username !== state.userInfo.username){
        new Audio(NewMsgSound).play().then(/* does nothing */)
    }
    dispatch(setMessages(messages))
}
