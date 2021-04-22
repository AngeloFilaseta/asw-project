import { useState } from "react"

import Button from "react-bootstrap/Button"
import { Row, Col } from "react-bootstrap"
import Modal from "react-bootstrap/Modal"

import Chat from "./Chat"
import UserList from "./userList/UserList"
import chatIcon from "../../img/chatIcon.png"
import usersIcon from "../../img/usersIcon.png"

export default function MobileBar() {

    const [showChat, setShowChat] = useState(false)
    const [showUsers, setShowUsers] = useState(false)

    return (
        <div className="d-md-none d-inline">
            <Row id="mobileBar" align={"center"} className={"m-1 "}>
                <Col className={"col-sm-6"}>
                    <Button
                        block
                        onClick={() => setShowChat(true)}>
                       <img alt="Chat" style={{ width: "30px", height: "30px" }} src={chatIcon} />
                    </Button>
                </Col>
                <Col className="col-sm-6">
                    <Button block onClick={() => setShowUsers(true)}>
                        <img alt="Users" style={{ width: "30px", height: "30px" }} src={usersIcon} />
                    </Button>
                </Col>
                <Modal show={showChat} onHide={() => setShowChat(false)}>
                    <Modal.Header closeButton />
                    <Modal.Body>
                        <Chat height={window.innerHeight * 0.82} />
                    </Modal.Body>
                </Modal>
                <Modal show={showUsers} onHide={() => setShowUsers(false)}>
                    <Modal.Header closeButton />
                    <Modal.Body>
                        <UserList height={window.innerHeight * 0.82} />
                    </Modal.Body>
                </Modal>
            </Row>
        </div>
    )

}