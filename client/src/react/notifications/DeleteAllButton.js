import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from "../common/ConfirmationModal";
import { deleteAllNotifications } from "./NotificationLogic";
import { AwesomeButton } from "react-awesome-button";

export default function DeleteAllButton(props) {

    const dispatch = useDispatch()
    const token = useSelector(state => state.userInfo.token)

    const [modalShow, setModalShow] = useState(false)
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const handleConfirmButton = () => { deleteAllNotifications(dispatch, token, props.notificationIdArray); setModalShow(false) }

    return (
        <>
            <AwesomeButton type="pinterest" onPress={handleShow} className="mt-2" style={{ width: '100%', fontSize: 15 }} size="large" ripple={true}>Delete all notifications</AwesomeButton>
            <ConfirmationModal show={modalShow}
                handleClose={handleClose}
                handleConfirm={handleConfirmButton}
                modalTitle={"Are you sure?"}
                modalBody={"Do you really want to delete ALL the notifications?"}
                confirmButtonName={"Delete All"} />
        </>);

}






