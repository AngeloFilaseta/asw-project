import React from "react"
import { Button, Col } from "react-bootstrap"
import { Navbar, Nav, NavDropdown } from "react-bootstrap"

import GuessrLogout from "./GuessrLogout"
import GuessrNotification from "./GuessrNotification"
import GuessrBrand from "./GuessrBrand";

export default function GuessrNavbar(props) {

    return (
        /*
        <Navbar bg="dark" variant="dark" id="navbar">
            <Col className="col-4 col-sm-3">
                <GuessrBrand/>
            </Col>
            <Col className="col-4 col-sm-6">
                <div className="text-white  text-center py-3" >
                    <h3 className="d-none d-sm-inline" title="title">{props.title}</h3>
                    <h6 className="d-sm-none d-inline">{props.title}</h6>
                    <h4 title="subtitle">{props.subtitle}</h4>
                </div>
            </Col>
            <Col className="col-4 col-sm-3 d-flex justify-content-end">
                <Nav>
                   <GuessrNotification/>
                   <GuessrLogout/>
                </Nav>
            </Col>
        </Navbar>*/

        <>
            <div className="d-none d-md-inline">
                <Navbar bg="dark" variant="dark" id="navbar">
                    <Col className="col-4 col-sm-3">
                        <GuessrBrand />
                    </Col>
                    <Col className="col-4 col-sm-6">
                        <div className="text-white  text-center py-3" >
                            <h3 className="d-none d-sm-inline" title="title">{props.title}</h3>
                            <h6 className="d-sm-none d-inline">{props.title}</h6>
                            <h4 title="subtitle">{props.subtitle}</h4>
                        </div>
                    </Col>
                    <Col className="col-4 col-sm-3 d-flex justify-content-end">
                        <Nav>
                            <GuessrNotification />
                            <GuessrLogout />
                        </Nav>
                    </Col>
                </Navbar>
            </div>

            <div className="d-md-none d-inline">
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">

                    <Navbar.Brand className="mr-0">
                        <GuessrBrand />
                    </Navbar.Brand>

                    <Nav className="m-auto justify-content-center">
                        <div className="text-white  text-center py-3" >
                            <h3 className="d-none d-sm-inline" title="title">{props.title}</h3>
                            <h6 className="d-sm-none d-inline">{props.title}</h6>
                            <h4 title="subtitle">{props.subtitle}</h4>
                        </div>
                    </Nav>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="dropdown-menu-end" id="responsive-navbar-nav">
                        <Nav className="ml-auto" >
                            <GuessrNotification/>
                            <GuessrLogout />
                        </Nav>

                    </Navbar.Collapse>

                </Navbar>

            </div>
        </>
    )

}
