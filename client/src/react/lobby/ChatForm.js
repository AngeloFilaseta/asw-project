import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "react-chat-elements/dist/main.css"
import { Row, Col } from "react-bootstrap"

import { sendMsg } from "./LobbyLogic"

import send from "../../img/send.svg"

export default function ChatForm() {

    let dispatch = useDispatch()
    const [msg, setMsg] = useState("");

    let username = useSelector(state => state.userInfo.username)
    let socket = useSelector(state => state.util.socket)
    let lobbyCode = useSelector(state => state.lobby.info.code)

    let changeMsgHandler = e => setMsg(e.target.value)
    let sendMsgHandler = () => {
        if (msg.trim() !== "") {
            sendMsg(dispatch, socket, username, lobbyCode, msg.trim())
            setMsg("")
        }
    }

    return (<Row className='mt-5 ml-md-3 ml-1'>
        <Col style={{ padding: "0 15px 0 0" }} className="col-9">
            <Form onSubmit={s => { s.preventDefault(); sendMsgHandler() }}>
                <Form.Group>
                    <Form.Control
                        id="chatSendButton"
                        onChange={changeMsgHandler}
                        placeholder="Type a message" />
                </Form.Group>
            </Form>
        </Col>
        <Col style={{ padding: 0 }} className="col-md-3 col-3">
            <Button onClick={sendMsgHandler}>
                <img alt="send icon" style={{ width: "1vw", height: "2vh" , minWidth:"16px", minHeight:"16px"}} src={send} />
            </Button>
        </Col>
    </Row>)
}

