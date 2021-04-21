import { useDispatch, useSelector } from "react-redux"

import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import { createLobby } from "../LobbyCreationLogic"

export default function CreateLobbyButton(){

    const dispatch = useDispatch()
    let isLoading = useSelector(state => state.util.isLoading)
    let isPublic = useSelector(state => state.lobby.settings.isPublic)
    let nTurns = useSelector(state => state.lobby.settings.nTurns)
    let language = useSelector(state => state.lobby.settings.language)
    let username = useSelector(state => state.userInfo.username)
    let id = useSelector(state => state.userInfo.id)
    let token = useSelector(state => state.userInfo.token)

    if (isLoading === true) {
        return (
            <Button block size="lg" variant="primary" disabled>
                <Spinner as="span" animation="border" size="slg" role="status" aria-hidden="true" />
                <span className="sr-only">Loading...</span>
            </Button>
        )
    } else {
        return <Button block size="lg" onClick={() => createLobby(dispatch, isPublic, nTurns, language, username, id, token)}>Create Lobby</Button>
    }

}