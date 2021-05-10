import { Row, Col } from "react-bootstrap"
import { NotificationContainer } from "react-notifications"
import AdaptiveNavbar from "./AdaptiveNavbar"
import MobileBar from "./MobileBar"
import MainContent from "./MainContent"
import Chat from "./Chat"
import UserList from "./userList/UserList"

export default function Template() {

    return (
        <div style={{ overflowX: "hidden" }}>
            <NotificationContainer />
            <AdaptiveNavbar />
            <MobileBar />
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
