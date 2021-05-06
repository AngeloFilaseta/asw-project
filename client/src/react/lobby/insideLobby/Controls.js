import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import {NotificationManager} from "react-notifications";
import { NotificationContainer } from "react-notifications"
import { Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { RedirectHome } from "../../common/GuessrRedirect"
import { beginGame } from "../LobbyLogic"
import UserTypes from "../../../util/playerType"
import {MIN_PLAYER_FOR_PLAYING} from "../../../util/global";

export default function Controls(){

    const dispatch = useDispatch()
    const [goHomepage, setGoHomepage] = useState(false)
    let username = useSelector(state => state.userInfo.username)
    let isMyRoleAdmin = useSelector(state => state.lobby.info.isMyRoleAdmin)
    let socket = useSelector(state => state.util.socket)
    let lobbyCode = useSelector(state => state.lobby.info.code)
    let userList = useSelector(state => state.lobby.info.users)

    return goHomepage ? <RedirectHome /> : getControls(isMyRoleAdmin, setGoHomepage, dispatch, username, socket, lobbyCode, userList)
}

function getControls(isMyRoleAdmin, setGoHomepage, dispatch, username, socket, lobbyCode, userList){
        return(
            <>
                <NotificationContainer />
                {(isMyRoleAdmin === UserTypes.ADMIN) &&
                    (<Col className="col-md-6 my-2">
                        <Button block size="lg" onClick={() => startGame(dispatch, socket, username, lobbyCode, userList)}>
                            <b>Start game</b>
                        </Button>
                    </Col>)
                }
                <Col className="col-md-6 my-2">
                    <Button block size="lg" variant="secondary" onClick={() => setGoHomepage(true)}>
                        <b>Exit lobby</b>
                    </Button>
                </Col>
            </>
        )
}


function startGame(dispatch, socket, username, lobbyCode, userList){
    if(userList.length < MIN_PLAYER_FOR_PLAYING) { //TODO CHANGE THIS TO 3
        NotificationManager.error("At least "+ MIN_PLAYER_FOR_PLAYING + " players are needed to play.", "Not enough player in the Lobby", 3000);
    } else {
        beginGame(dispatch, socket, username, lobbyCode)
    }

}