import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux"
import logoutIcon from "../../../img/logout.png"
import ConfirmationModal from "../ConfirmationModal";
import React, { useState } from "react";
import { logout } from "../../authentication/AuthenticationLogic";

export default function GuessrLogout() {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleConfirmButton = () => logout(dispatch)

    const dispatch = useDispatch()
    return useSelector(state => state.userInfo.username) === null
        ?
        (<></>)
        :
        <>
            <div className="d-none d-md-inline">
                <Button variant="btn-primary-outline" style={{ border: "none", hover: "none" }} onClick={handleShow} >
                    <img alt="Logout icon" style={{ width: "30px", height: "30px" }} src={logoutIcon} />
                </Button>
            </div>

            <div className="d-md-none d-inline">
                <Button block variant="btn-primary-outline" style={{ textAlign: "right", color: "#FFFFFF", marginTop: 10, border: "none", hover: "none" }} onClick={handleShow} >
                    Logout
                    <img alt="Logout " style={{ marginLeft: 25, width: "30px", height: "30px" }} src={logoutIcon} />
                </Button>
            </div>

            <ConfirmationModal show={show}
                handleClose={handleClose}
                handleConfirm={handleConfirmButton}
                modalTitle={"Are you sure?"}
                modalBody={"Do you really want to logout?"}
                confirmButtonName={"Logout"} />
        </>
}

