import Button from "react-bootstrap/Button"

import trashIcon from "../../img/trash.png"
import {useDispatch, useSelector} from "react-redux";
import {deleteNotificationRequest} from "./NotificationLogic";

export default function DeleteButton(props) {
    const dispatch = useDispatch()
    const token= useSelector(state => state.userInfo.token)
    return ( <Button className=" btn-danger" onClick={() => deleteNotificationRequest(dispatch,token, props.idNotification)}>
                <img alt="Delete" style={{ width: "30px", height: "30px" }} src={trashIcon} />
            </Button>)
}
