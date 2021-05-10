import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from "react-bootstrap/Button";
import ConfirmationModal from "../common/ConfirmationModal";
import {deleteAllNotifications} from "./NotificationLogic";

export default function DeleteAllButton(props) {

    const dispatch = useDispatch()
    const token = useSelector(state => state.userInfo.token)

    const [modalShow, setModalShow] = useState(false)
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const handleConfirmButton= () => {deleteAllNotifications(dispatch, token, props.notificationIdArray); setModalShow(false)}

    return (
        <>
            <Button className=" btn-danger"
                        onClick={handleShow}>
                    Delete all notifications
                </Button>
                <ConfirmationModal show={modalShow}
                                   handleClose={handleClose}
                                   handleConfirm={handleConfirmButton}
                                   modalTitle={"Are you sure?"}
                                   modalBody={"Do you really want to delete ALL the notifications?"}
                                   confirmButtonName={"Delete All"}/>
        </>);

}






