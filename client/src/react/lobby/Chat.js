import { useSelector } from "react-redux"
import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"
import "react-chat-elements/dist/main.css"
import { MessageBox } from "react-chat-elements"

import ChatForm from "./ChatForm";

export default function Chat(props) {

    let messages = useSelector(state => state.lobby.messages)
    let username = useSelector(state => state.userInfo.username)

    return (
        <Card style={{ overflow: "hidden", height: props.height }} className={"mt-3"}>
            <Card.Title className="pt-3 pl-3">Chat</Card.Title>
            <Card.Body id={"scroll"} style={{ overflowY: "scroll", height: props.height }}>
                <ListGroup >{updateChat(messages, username)}</ListGroup>
            </Card.Body>
            <ChatForm/>
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
