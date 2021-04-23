import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import ListGroup from "react-bootstrap/ListGroup"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import "react-chat-elements/dist/main.css"
import { MessageBox } from "react-chat-elements"
import { Row, Col } from "react-bootstrap"

import { sendMsg } from "./LobbyLogic"

export default function Chat(props) {

    const dispatch = useDispatch()
    let [msg, setMsg] = useState("")
    let username = useSelector(state => state.userInfo.username)
    let socket = useSelector(state => state.util.socket)
    let messages = useSelector(state => state.lobby.messages)
    let lobbyCode = useSelector(state => state.lobby.info.code)

    return (
        <Card style={{ overflow: "hidden", height: props.height }} className={"mt-3"}>
            <Card.Title className="pt-3 pl-3">Chat</Card.Title>
            <Card.Body id={"scroll"} style={{ overflowY: "scroll", height: props.height }}>
                <ListGroup >{updateChat(messages, username)}</ListGroup>
            </Card.Body>
            <Row className='mt-5 ml-md-3 ml-1'>
                <Col className="col-8">
                    <Form onSubmit={s => {s.preventDefault()}}>
                        <Form.Group>
                            <Form.Control
                                id="chatSendButton"
                                onChange={e => setMsg(e.target.value)}
                                placeholder="Type a message"
                            />
                        </Form.Group>
                    </Form>
                </Col>
                <Col className="col-md-3 col-3">
                    <Button block onClick={() => sendMsg(dispatch, socket, username, lobbyCode, msg)}>&lt;</Button>
                </Col>
            </Row>
        </Card>
    )
}

function updateChat(messages, username) {
    let i = 0

    let result = (
        <>
            {messages.map(item => (
                <MessageBox
                    className={"mt-1"}
                    key={"msg " + i++}
                    title={item.username}
                    titleColor={"blue"}
                    date={null}
                    text={item.message}
                    position={item.username === username ? "right" : "left"}
                />
            ))}
        </>
    )

    let objDiv = document.getElementById("scroll")
    if (objDiv !== null) {
        objDiv.scrollTop = objDiv.scrollHeight
    }

    return result
}
