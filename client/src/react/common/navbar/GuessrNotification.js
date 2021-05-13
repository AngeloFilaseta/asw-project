import Button from "react-bootstrap/Button"
import { useSelector } from "react-redux"
import { useLocation } from 'react-router-dom'

import bellIcon from "../../../img/bell.png"
import { useState } from "react";
import { RedirectNotifications } from "../GuessrRedirect"
import ConfirmationModal from "../ConfirmationModal"

export default function GuessrNotification() {
    let notifications = useSelector(state => state.userInfo.notifications);
    const [goToNotifications, setGoToNotifications] = useState(false)
    const [show, setShow] = useState(false)
    let pathname = useLocation().pathname

    return useSelector(state => state.userInfo.username) === null ? (<></>) :
        (goToNotifications ?
            <RedirectNotifications /> :
            (<>
                <div className="d-none d-md-inline"><Button variant="btn-primary-outline" style={{ minWidth: "80px" }} onClick={() => {pathname !== "/lobby" ? setGoToNotifications(true) : setShow(true)}}>
                    <span className="badge badge-danger" style={{ position: "relative", right: -15, top: -2, display: "inline-block" }}>
                        {notifications.length}</span>
                    <img alt="Alerts" style={{ width: "30px", height: "30px" }} src={bellIcon} />
                </Button></div>

                <div className="d-md-none d-inline"><Button block variant="btn-primary-outline" style={{ textAlign: "right", color: "#FFFFFF", marginTop: 10, border: "none", hover: "none" }} onClick={() => {pathname !== "/lobby" ? setGoToNotifications(true) : setShow(true)}}>
                    Notification center
                    <span className="badge badge-danger" style={{ position: "relative", right: -15, top: -2, display: "inline-block" }}>
                        {notifications.length}</span>
                    <img alt="Alerts" style={{ width: "30px", height: "30px" }} src={bellIcon} />

                </Button></div>

                <ConfirmationModal 
                    show={show}
                    handleClose={() => setShow(false)}
                    handleConfirm={() => setGoToNotifications(true)}
                    modalTitle={"Are you sure?"}
                    modalBody={"Do you really want to go to previous reports, you will exit from the current lobby?"}
                    confirmButtonName={"Confirm"} 
                /> 
            </>))
}
