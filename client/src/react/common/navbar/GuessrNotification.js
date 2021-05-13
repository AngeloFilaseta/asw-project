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
            (<>
                <div className="d-none d-md-inline"><Button variant="btn-primary-outline" style={{ minWidth: "80px" }} onClick={() => setGoToNotifications(true)}>
                    <span className="badge badge-danger" style={{ position: "relative", right: -15, top: -2, display: "inline-block" }}>
                        {notifications.length}</span>
                    <img alt="Alerts" style={{ width: "30px", height: "30px" }} src={bellIcon} />
                </Button></div>

                <div className="d-md-none d-inline"><Button block variant="btn-primary-outline" style={{ textAlign: "right", color: "#FFFFFF", marginTop: 10, border: "none", hover: "none" }} onClick={() => setGoToNotifications(true)}>
                    Notification center
                    <span className="badge badge-danger" style={{ position: "relative", right: -15, top: -2, display: "inline-block" }}>
                        {notifications.length}</span>
                    <img alt="Alerts" style={{ width: "30px", height: "30px" }} src={bellIcon} />

                </Button></div> </>))
}
