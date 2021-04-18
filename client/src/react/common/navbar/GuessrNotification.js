import Button from "react-bootstrap/Button"
import {useSelector} from "react-redux"

import bellIcon from "../../../img/bell.png"

export default function GuessrNotification() {
    let notifications = useSelector(state => state.userInfo.notifications);
    return useSelector(state => state.userInfo.username) === null ?
        (<></>) :
        (<Button >
            <img alt="Alerts" style={{ width: "30px", height: "30px" }} src={bellIcon} />
            <span className="badge badge-danger">{notifications.length}</span>
        </Button>)
}
