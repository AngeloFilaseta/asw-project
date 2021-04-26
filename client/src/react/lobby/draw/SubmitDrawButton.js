import { useSelector, useDispatch } from "react-redux"

import { submitDraw } from "../LobbyLogic"
import { Button } from "react-bootstrap"
import { setWaitingAllSubmitted } from "../../../redux/lobby/actions"

export default function SubmitDrawButton(props){

    const dispatch = useDispatch()
    let socket = useSelector(state => state.util.socket)
    let id_user = useSelector(state => state.userInfo.id)
    let lobbyCode = useSelector(state => state.lobby.info.code)

    return(
        <Button 
            id="submitDraw"
            className="mx-3"
            onClick={() => {
                dispatch(setWaitingAllSubmitted(true));
                submitDraw(dispatch, socket, id_user, lobbyCode, props.draw.getSvgXML());
            }}>
            Submit
        </Button>
    )
}