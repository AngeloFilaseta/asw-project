import { useDispatch, useSelector } from "react-redux"

import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import { createLobby } from "../LobbyCreationLogic"

export default function CreateLobbyButton(){

    const dispatch = useDispatch()
    var isLoading = useSelector(state => state.loading)
    var isPublic = useSelector(state => state.lobby.isPublic)
    var nTurns = useSelector(state => state.lobby.nTurns)
    var language = useSelector(state => state.lobby.language)
    var username = useSelector(state => state.userInfo.username)
    var id = useSelector(state => state.userInfo.id)
    var token = useSelector(state => state.userInfo.token)

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