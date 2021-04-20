import { useState } from "react"
import { useSelector } from "react-redux"

import ListGroup from "react-bootstrap/ListGroup"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import "react-chat-elements/dist/main.css"
import { MessageBox } from "react-chat-elements"
import { Row, Col } from "react-bootstrap"

import { sendMsg } from "./LobbyLogic"

export default function Chat(props) {

    const [msg, setMsg] = useState("")
    var username = useSelector(state => state.userInfo.username)
    var socket = useSelector(state => state.util.socket)
    var messages = useSelector(state => state.lobby.messages)
    var lobbyCode = useSelector(state => state.lobby.info.code)

    return (
        <Card style={{ overflow: "hidden", height: props.height }} className={"mt-3"}>
            <Card.Title className="pt-3 pl-3">Chat</Card.Title>
            <Card.Body id={"scroll"} style={{ overflowY: "scroll", height: props.height }}>
                <ListGroup >{updateChat(messages, username)}</ListGroup>
            </Card.Body>
            <Row className='mt-5 ml-md-3 ml-1'>
                <Col className="col-8">
                    <Form onSubmit={s => { s.preventDefault(); sendMsg(socket, username, lobbyCode, msg); }}>
                        <Form.Group>
                            <Form.Control
                                id="chatSendButton"
                                onChange={e => setMsg(e)}
                                placeholder="Type a message"
                            />
                        </Form.Group>
                    </Form>
                </Col>
                <Col className="col-md-3 col-3">
                    <Button block onClick={() => sendMsg(eventbus, username, lobbyCode, msg)}>&lt;</Button>
                </Col>
            </Row>
        </Card>
    )
}

function updateChat(messages, username) {
    var i = 0

    var result = (
        <>
            {messages.map(listitem => (
                <MessageBox
                    className={"mt-1"}
                    key={"msg " + i++}
                    title={listitem.username}
                    titleColor={"blue"}
                    date={null}
                    text={listitem.msg}
                    position={listitem.username === username ? "right" : "left"}
                />
            ))}
        </>
    )

    var objDiv = document.getElementById("scroll")
    if (objDiv !== null) {
        objDiv.scrollTop = objDiv.scrollHeight
    }

    return result
}
