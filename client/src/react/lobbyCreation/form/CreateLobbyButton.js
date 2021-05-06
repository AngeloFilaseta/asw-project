import { useDispatch, useSelector } from "react-redux"

import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"

import { createLobby } from "../LobbyCreationLogic"

export default function CreateLobbyButton(){

    const dispatch = useDispatch()
    let isLoading = useSelector(state => state.util.isLoading)
    let state = useSelector(state => state)

    if (isLoading === true) {
        return (
            <Button block size="lg" variant="primary" disabled>
                <Spinner as="span" animation="border" size="slg" role="status" aria-hidden="true" />
                <span className="sr-only">Loading...</span>
            </Button>
        )
    } else {
        return <Button block size="lg" onClick={() => createLobby(dispatch, state)}>Create Lobby</Button>
    }

}