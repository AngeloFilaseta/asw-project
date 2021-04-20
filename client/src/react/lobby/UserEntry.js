import ListGroup from "react-bootstrap/ListGroup"

export default function UserEntry() {
    return props.admin === true ?
        <ListGroup.Item variant="primary">{props.username}</ListGroup.Item> : <ListGroup.Item>{props.username}</ListGroup.Item>
}