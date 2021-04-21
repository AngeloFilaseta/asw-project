import { Row, Col } from 'react-bootstrap';
import Sentence from './Sentence';
import { useSelector, useDispatch } from 'react-redux';
import GuessrNavbar from "../common/navbar/GuessrNavbar"
import { setWaitingAllSubmited } from "../../redux/lobby/actions"
import Chat from "./Chat"
import UserList from "./UserList"


export default function Template() {

    /*
    const dispatch = useDispatch();

    var status = useSelector(state => state.lobby.status);
    var eventbus = useSelector(state => state.eventbus);
    var username = useSelector(state => state.username);
    var lobbyCode = useSelector(state => state.lobby.code);
    var receivedData = useSelector(state => state.lobby.receivedData);
    var isPublic = useSelector(state => state.lobby.isPublic);
    var waitingAllSubmit = useSelector(state => state.lobby.waitingAllSubmit);
    var isAdmin = useSelector(state => state.lobby.isMyRoleAdmin);

    return (
        <div style={{ overflowX: "hidden" }}>
            {getNavbar(status, isPublic, lobbyCode)}
            <Row style={{ overflow: "hidden" }}>
                <Col className="d-none d-md-inline">
                    <div className="mh-100">
                        <Chat height={'80vh'} />
                    </div>
                </Col>
                <Col className="col-md-6 mt-md-3">
                    {getMainContent(status, receivedData, eventbus, username, lobbyCode, dispatch, waitingAllSubmit, isAdmin)}
                </Col>
                <Col className="d-none d-md-inline ">
                    <UserList height={'80vh'} />
                </Col>
            </Row >
        </div>
    );*/
}
