import { useSelector } from "react-redux"

import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"

import UserEntry from "./UserEntry"

export default function UserList(props) {
    return (
        <Card style={{ overflow: "hidden", height: props.height }} className={"mt-3"}>
            <Card.Title className="pt-3 pl-3">Players</Card.Title>
            <Card.Body style={{ overflowY: "scroll", height: props.height }}>
                <ListGroup>
                    {updateList(useSelector(state => state.lobby.info.users))}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

function updateList(userList) {
    var i = 0
    return (
        <>
            {userList.map(listitem => (
                <UserEntry
                    username={listitem.username}
                    key={"user " + i++}
                    admin={listitem.type === "ADMIN" ? true : false}
                />
            ))}
        </>
    )
}