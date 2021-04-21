import { useSelector, useDispatch } from "react-redux"

import { Row, Col } from "react-bootstrap"

import Sentence from "./Sentence"
import { setWaitingAllSubmited } from "../../redux/lobby/actions"
import AdaptiveNavbar from "./AdaptiveNavbar"
import MainContent from "./MainContent"
import Chat from "./Chat"
import UserList from "./UserList"


export default function Template() {

    const dispatch = useDispatch()

    var status = useSelector(state => state.lobby.status)
    var socket = useSelector(state => state.util.socket)
    var username = useSelector(state => state.userInfo.username)
    var lobbyCode = useSelector(state => state.lobby.info.code)
    var receivedData = useSelector(state => state.lobby.receivedData)
    var isPublic = useSelector(state => state.lobby.settings.isPublic)
    var waitingAllSubmit = useSelector(state => state.lobby.waitingAllSubmit)
    var isAdmin = useSelector(state => state.lobby.info.isMyRoleAdmin)

    return (
        <div style={{ overflowX: "hidden" }}>
            <AdaptiveNavbar />
            <Row style={{ overflow: "hidden" }}>
                <Col className="d-none d-md-inline">
                    <div className="mh-100">
                        <Chat height={'80vh'} />
                    </div>
                </Col>
                <Col className="col-md-6 mt-md-3">
                    <MainContent />
                </Col>
                <Col className="d-none d-md-inline ">
                    <UserList height={'80vh'} />
                </Col>
            </Row>
        </div>
    )

}
