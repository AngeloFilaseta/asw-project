import React, { useState } from "react"
import { useLocation } from 'react-router-dom'

import Navbar from "react-bootstrap/Navbar"
import { RedirectHome } from "../GuessrRedirect"
import ConfirmationModal from "../ConfirmationModal";

export default function GuessrBrand() {

    let [isRedirectHome, setRedirectHome] = useState(false)
    let currentLocation = useLocation()

    const [modalShow, setModalShow] = useState(false)
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    const handleConfirmButton = () => (currentLocation.pathname !== "/home") ? setRedirectHome(true) : setRedirectHome(false)

    if (isRedirectHome) {
        return <RedirectHome />
    } else {
        return (
            <>
                <Navbar.Brand className="mr-0" onClick={currentLocation.pathname === "/lobby" ? handleShow : handleConfirmButton}>
                    <h2 className="border border-primary p-1 rounded" >
                        <div className="d-none d-md-inline ">GuessR</div>
                        <div className="d-md-none d-inline ">GR</div>
                    </h2>
                </Navbar.Brand>
                <ConfirmationModal show={modalShow}
                    handleClose={handleClose}
                    handleConfirm={handleConfirmButton}
                    modalTitle={"Are you sure?"}
                    modalBody={"Do you really want to go back to the HomePage?"}
                    confirmButtonName={"Go Back"} />
            </>
        )
    }
}
