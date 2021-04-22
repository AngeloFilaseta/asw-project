import { useSelector, useDispatch } from "react-redux"

import { submitDraw } from "../LobbyLogic"
import { Button } from "react-bootstrap"
import { setWaitingAllSubmited } from "../../../redux/lobby/actions"

export default function SubmitDrawButton(props){

    const dispatch = useDispatch()
    let socket = useSelector(state => state.util.socket)
    let username = useSelector(state => state.userInfo.username)
    let lobbyCode = useSelector(state => state.lobby.info.code)

    return(
        <Button 
            id="submitDraw"
            className="mx-3"
            onClick={() => {
                dispatch(setWaitingAllSubmited(true)); 
                submitDraw(dispatch, socket, username, lobbyCode, props.draw.getSvgXML()); 
            }}>
            Submit
        </Button>
    )
}