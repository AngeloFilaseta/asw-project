import { useDispatch, useSelector } from "react-redux"

import { Form } from "react-bootstrap"

import { setWaitingAllSubmited } from "../../../redux/lobby/actions"
import { submitSentence } from "../LobbyLogic"

export default function SentenceInput(props){

    const dispatch = useDispatch()
    let socket = useSelector(state => state.util.socket)
    let username = useSelector(state => state.userInfo.username)
    let lobbyCode = useSelector(state => state.lobby.info.code)

    return(
        <Form 
            className="border border-primary rounded mx-3 mx-md-0 p-3" 
            onSubmit={s => { 
                s.preventDefault()
                dispatch(setWaitingAllSubmited(true)) 
                submitSentence(dispatch, socket, username, lobbyCode, props.sentence)
        }}>
            <h5 align="center">Write your sentence:</h5>
            <Form.Control type="text" placeholder="Sentence" onChange={props.onChange} />
            <h1 id="submittedSentence">{""}</h1>
        </Form>
    )

}