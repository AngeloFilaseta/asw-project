import { useSelector, useDispatch } from "react-redux"

import Form from "react-bootstrap/Form"
import { Col, Row } from "react-bootstrap"

import {setIsPublic} from "../../../redux/lobby/actions"

export default function VisibilitySwitch() {

    const dispatch = useDispatch()

    return (
        <Row className="border border-primary rounded m-1">
            <h3 className="col-12 d-flex justify-content-center">Lobby should be:</h3>
            <Col className="col-5 d-flex justify-content-end">
                <h5 className="text-primary">Private</h5>
            </Col>
            <Col className="col-2 d-flex justify-content-center">
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    onChange={handleChangePublic(dispatch, useSelector(state => state.lobby.isPublic))}
                />
            </Col>
            <Col className="col-5 d-flex justify-content-start">
                <h5 className="text-primary" >Public</h5>
            </Col>
        </Row>
    )
}

function handleChangePublic(dispatch, isPublic) {
    return () => {
        isPublic = !isPublic
        dispatch(setIsPublic(isPublic))
    }
}