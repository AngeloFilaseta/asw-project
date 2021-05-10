import trashIcon from "../../img/trash.png"
import React, { useState } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import { deleteNotificationRequest } from "./NotificationLogic";
import { useDispatch, useSelector } from "react-redux";

import { AwesomeButton } from "react-awesome-button";

export default function DeleteButton(props) {

    const dispatch = useDispatch()
    const token = useSelector(state => state.userInfo.token)

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleConfirmButton = () => deleteNotificationRequest(dispatch, token, props.idNotification)

    return (<>
        <AwesomeButton onPress={handleShow}
            className="mb-2"
            type="pinterest" ripple="true">
            <img alt="Delete" style={{ width: "30px", height: "30px" }} src={trashIcon} />
        </AwesomeButton>

        <ConfirmationModal show={show}
            handleClose={handleClose}
            handleConfirm={handleConfirmButton}
            modalTitle={"Are you sure?"}
            modalBody={"Do you really want to delete this notification?"}
            confirmButtonName={"Delete"} />
    </>
    )
}
