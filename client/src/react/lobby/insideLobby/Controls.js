import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

import { NotificationContainer } from "react-notifications"
import { Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { RedirectHome } from "../../common/GuessrRedirect"
import { beginGame } from "../LobbyLogic"
import UserTypes from "../../../util/playerType"

export default function Controls(){

    const dispatch = useDispatch()
    const [goHomepage, setGoHomepage] = useState(false)
    let username = useSelector(state => state.userInfo.username)
    let isMyRoleAdmin = useSelector(state => state.lobby.info.isMyRoleAdmin)
    let socket = useSelector(state => state.util.socket)
    let lobbyCode = useSelector(state => state.lobby.info.code)

    return goHomepage ? <RedirectHome /> : getControls(isMyRoleAdmin, setGoHomepage, dispatch, username, socket, lobbyCode)
}

function getControls(isMyRoleAdmin, setGoHomepage, dispatch, username, socket, lobbyCode){
    if(isMyRoleAdmin === UserTypes.ADMIN){
        return(
            <>
                <NotificationContainer />
                <Col className="col-md-6 my-2">
                    <Button block size="lg" onClick={() => beginGame(dispatch, socket, username, lobbyCode)}>
                        <b>Start game</b>
                    </Button>
                </Col>
                <Col className="col-md-6 my-2">
                    <Button block size="lg" variant="secondary" onClick={() => setGoHomepage(true)}>
                        <b>Exit lobby</b>
                    </Button>
                </Col>
            </>
        )
    } else {
        return(
            <>
                <NotificationContainer />
                <Col className="col-md-6 my-2">
                    <Button block size="lg" variant="secondary" onClick={() => setGoHomepage(true)}>
                        <b>Exit lobby</b>
                    </Button>
                </Col>
            </>
        )
    }
}