import React, { useState } from "react"
import { useLocation } from 'react-router-dom'

import Navbar from "react-bootstrap/Navbar"
import { RedirectHome } from "../GuessrRedirect"
import ConfirmationModal from "../ConfirmationModal";

import logo from "../../../img/logo.png"
import logoMobile from "../../../img/logo_piccolo.png"

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
                <Navbar.Brand className="mr-0 navBrand" onClick={currentLocation.pathname === "/lobby" ? handleShow : handleConfirmButton}>
                    <img className="d-none d-md-inline" style={{ height: 50 }} alt="logo" src={logo} />
                    <img className="d-md-none d-inline" alt="logoMobile" src={logoMobile} />
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