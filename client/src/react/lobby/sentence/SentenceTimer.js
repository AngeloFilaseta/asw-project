import { useSelector, useDispatch } from "react-redux"

import Timer from "../../common/Timer"
import { submitSentence } from "../LobbyLogic"

export default function SentenceTimer(props){

    const dispatch = useDispatch()
    let socket = useSelector(state => state.util.socket)
    let username = useSelector(state => state.userInfo.username)
    let lobbyCode = useSelector(state => state.lobby.info.code)
    let waitingAllSubmit = useSelector(state => state.lobby.waitingAllSubmit)

    if(waitingAllSubmit){
        return <></>
    } else {
        return(
            <Timer 
                nSeconds={60} 
                handler={() => submitSentence(dispatch, socket, username, lobbyCode, props.sentence)} 
            />
        )
    }

}