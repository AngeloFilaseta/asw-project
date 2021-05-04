import { useDispatch, useSelector } from "react-redux"

import { Button } from "react-bootstrap"
import { submitSentence } from "../LobbyLogic"
import { setWaitingAllSubmitted } from "../../../redux/lobby/actions"

export default function SubmitSentenceButton(props){

    const dispatch = useDispatch()
    let socket = useSelector(state => state.util.socket)
    let id_username = useSelector(state => state.userInfo.id)
    let lobbyCode = useSelector(state => state.lobby.info.code)
    let report_to_id = useSelector(state => state.lobby.receivedData)

    return(
        <Button
            id="submitSentence"
            className="mt-3 col-6"
            size="lg"
            onClick={() => {
                dispatch(setWaitingAllSubmitted(true))
                submitSentence(dispatch, socket, id_username, report_to_id, lobbyCode, props.sentence)
        }}>
            Submit
        </Button>
    )

}