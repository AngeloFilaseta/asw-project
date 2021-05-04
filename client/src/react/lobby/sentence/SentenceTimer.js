import { useSelector, useDispatch } from "react-redux"

import Timer from "../../common/Timer"
import { submitSentence } from "../LobbyLogic"
import Audio from '../../../sound/King Crimson.mp3'
import AudioWaiting from "../../../sound/waiting.mp3"
import AudioPlay from "../../common/AudioPlay"

export default function SentenceTimer(props){

    const dispatch = useDispatch()
    let socket = useSelector(state => state.util.socket)
    let username = useSelector(state => state.userInfo.username)
    let lobbyCode = useSelector(state => state.lobby.info.code)
    let waitingAllSubmit = useSelector(state => state.lobby.waitingAllSubmit)

    if(!waitingAllSubmit){
        return(
            <>
                <Timer
                    nSeconds={60}
                    handler={() => submitSentence(dispatch, socket, username, lobbyCode, props.sentence)}
                />
                <AudioPlay source={Audio}/>
            </>)
    } else {
        return <AudioPlay source={AudioWaiting}/>
    }

}