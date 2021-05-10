import { useDispatch, useSelector } from "react-redux"

import { Form } from "react-bootstrap"

import { setWaitingAllSubmitted } from "../../../redux/lobby/actions"
import { submitSentence } from "../LobbyLogic"

export default function SentenceInput(props){

    const dispatch = useDispatch()
    let socket = useSelector(state => state.util.socket)
    let username = useSelector(state => state.userInfo.username)
    let lobbyCode = useSelector(state => state.lobby.info.code)
    let report_to_id = useSelector(state => state.lobby.receivedData)

    return(
        <Form 
            className="border border-primary rounded mx-3 mx-md-0 p-3" 
            onSubmit={s => { 
                s.preventDefault()
                dispatch(setWaitingAllSubmitted(true))
                submitSentence(dispatch, socket, username, lobbyCode, report_to_id, props.sentence)
        }}>
            <h5 className={"pt-5"} align="center">What do you see?</h5>
            <Form.Control type="text" placeholder="Sentence" onChange={props.onChange} />
            <h1 id="submittedSentence">{""}</h1>
        </Form>
    )

}