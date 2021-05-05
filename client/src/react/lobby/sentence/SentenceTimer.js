import { useSelector, useDispatch } from "react-redux"

import Timer from "../../common/Timer"
import { submitSentence } from "../LobbyLogic"
import Audio from '../../../sound/King Crimson.mp3'
import AudioWaiting from "../../../sound/waiting.mp3"
import AudioPlay from "../../common/AudioPlay"

export default function SentenceTimer(props){

    const dispatch = useDispatch()
    let socket = useSelector(state => state.util.socket)
    let id_user = useSelector(state => state.userInfo.id)
    let lobbyCode = useSelector(state => state.lobby.info.code)
    let waitingAllSubmit = useSelector(state => state.lobby.waitingAllSubmit)
    let report_to_id = useSelector(state => state.lobby.receivedData)

    if(!waitingAllSubmit){
        return(
            <>
                <Timer
                    nSeconds={60}
                    handler={() => submitSentence(dispatch, socket, id_user ,report_to_id, lobbyCode, props.sentence)}
                />
                <AudioPlay source={Audio}/>
            </>)
    } else {
        return <AudioPlay source={AudioWaiting}/>
    }

}