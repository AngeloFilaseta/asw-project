import ListGroup from "react-bootstrap/ListGroup"

export default function UserEntry(props) {
    return props.admin === true ?
        <ListGroup.Item variant="primary">
            {printName(props.itsMe, props.username)}
        </ListGroup.Item> :
        <ListGroup.Item>
            {printName(props.itsMe, props.username)}
        </ListGroup.Item>
}

function printName(itsMe, username){
    if(itsMe){
        return <b>{username}</b>
    }else{
        return <p>{username}</p>
    }
}