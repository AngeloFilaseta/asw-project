import { useSelector, useDispatch } from "react-redux"

import Timer from "../../common/Timer"
import { submitDraw } from "../LobbyLogic"
import Audio from "../../../sound/avdol.mp3"
import AudioWaiting from "../../../sound/waiting.mp3"
import AudioPlay from "../../common/AudioPlay"

export default function DrawTimer(props){

    let dispatch = useDispatch()
    let socket = useSelector(state => state.util.socket)
    let id_user = useSelector(state => state.userInfo.id)
    let lobbyCode = useSelector(state => state.lobby.info.code)
    let waitingAllSubmit = useSelector(state => state.lobby.waitingAllSubmit)
    let report_to_id = useSelector(state => state.lobby.receivedData)

    if(waitingAllSubmit){
        return <AudioPlay source={AudioWaiting}/>
    } else {
        return(
            <>
                <Timer
                    nSeconds={120}
                    handler={() => submitDraw(dispatch, socket, id_user, report_to_id, lobbyCode, props.draw.getSvgXML())}
                />
                <AudioPlay source={Audio}/>
            </>
        )
    }

}