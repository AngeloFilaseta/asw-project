import {useDispatch, useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {deleteNotificationRequest} from "./NotificationLogic";
import React from "react";

export default function DeleteConfirmationModal(props) {



    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => deleteNotificationRequest(dispatch, token, props.idNotification)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );

}
