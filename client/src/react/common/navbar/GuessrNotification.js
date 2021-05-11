import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux"

import bellIcon from "../../../img/bell.png"
import { useState } from "react";
import { RedirectNotifications } from "../GuessrRedirect";

export default function GuessrNotification() {
    let notifications = useSelector(state => state.userInfo.notifications);
    const [goToNotifications, setGoToNotifications] = useState(false)

    return useSelector(state => state.userInfo.username) === null ? (<></>) :
        (goToNotifications ?
            <RedirectNotifications /> :
            (<Button variant="btn-primary-outline" style={{ minWidth: "80px"}} onClick={() => setGoToNotifications(true)}>
                <span className="badge badge-danger" style={{position: "relative", right:-15, top:-2 , display: "inline-block"}}>
                    {notifications.length}</span>
                <img alt="Alerts" style={{ width: "30px", height: "30px" }} src={bellIcon} />
                
            </Button>))
}
