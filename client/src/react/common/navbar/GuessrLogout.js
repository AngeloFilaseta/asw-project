import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux"
import logoutIcon from "../../../img/logout.png"
import ConfirmationModal from "../ConfirmationModal";
import React, {useState} from "react";
import {logout} from "../../authentication/AuthenticationLogic";

export default function GuessrLogout() {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleConfirmButton= () => logout(dispatch)

    const dispatch = useDispatch()
    return useSelector(state => state.userInfo.username) === null
        ?
        (<></>)
        :
        <>
            <Button onClick={handleShow}>
                <div className="d-none d-md-inline ">
                    <b>Logout</b>
                </div>
                <img alt="Logout" style={{ width: "30px", height: "30px" }} src={logoutIcon} />
            </Button>
            <ConfirmationModal show={show}
                               handleClose={handleClose}
                               handleConfirm={handleConfirmButton}
                               modalTitle={"Are you sure?"}
                               modalBody={"Do you really want to logout?"}
                               confirmButtonName={"Logout"}/>
        </>
}

