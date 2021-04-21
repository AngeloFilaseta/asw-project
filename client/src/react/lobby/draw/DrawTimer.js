import { useSelector, useDispatch } from "react-redux"

import Timer from "../../common/Timer"
import { submitDraw } from "../LobbyLogic"

export default function DrawTimer(props){

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
                nSeconds={120} 
                handler={() => submitDraw(dispatch, socket, username, lobbyCode, props.draw.getSvgXML())} 
            />
        )
    }

}