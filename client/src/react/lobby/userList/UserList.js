import { useSelector } from "react-redux"

import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"

import UserEntry from "./UserEntry"
import PlayerType from "../../../util/playerType"

export default function UserList(props) {
    let users = useSelector(state => state.lobby.info.users)
    return (
        <Card style={{ overflow: "hidden", height: props.height }} className={"mt-3"}>
            <Card.Title className="pt-3 pl-3">Players</Card.Title>
            <Card.Body style={{ overflowY: "scroll", height: props.height }}>
                <ListGroup>
                    {updateList(users)}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

function updateList(userList) {
    var i = 0
    return (
        <>
            {userList.map(item => (
                <UserEntry
                    username={item["username"]}
                    key={"user " + i++}
                    admin={item["type"] === PlayerType.ADMIN}
                />
            ))}
        </>
    )
}