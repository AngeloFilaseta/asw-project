import { Col } from "react-bootstrap"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

import GuessrLogout from "./GuessrLogout"

export default function GuessrNavbar(props) {
    return (
        <Navbar bg="dark" variant="dark" id="navbar">
            <Col className="col-4 col-sm-3">
                <Navbar.Brand href={"/"}>
                    <h2 className="border border-primary p-1 rounded" >
                        <div className="d-none d-md-inline ">GuessR</div>
                        <div className="d-md-none d-inline ">GR</div>
                    </h2>
                </Navbar.Brand>
            </Col>
            <Col className="col-4 col-sm-6">
                <div className="text-white  text-center py-3" >
                    <h3 className="d-none d-sm-inline">{props.title}</h3>
                    <h6 className="d-sm-none d-inline">{props.title}</h6>
                    <h4>{props.subtitle}</h4>
                </div>
            </Col>
            <Col className="col-4 col-sm-3 d-flex justify-content-end">
                <Nav>
                    <GuessrLogout />
                </Nav>
            </Col>
        </Navbar>
    )
}
