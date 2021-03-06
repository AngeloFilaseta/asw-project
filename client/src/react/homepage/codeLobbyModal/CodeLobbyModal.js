import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import LoadingOverlay from "react-loading-overlay"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import searchCodeLobby from "./CodeLobbySearch"

export default function CodeLobbyModal(props){

    const dispatch = useDispatch()
    const [code, setCode] = useState("")
    let isLoading = useSelector(state => state.util.isLoading)
    let state = useSelector(state => state)

    return (
        <Modal show={props.isShowing} onHide={props.onHide}>
            <LoadingOverlay active={isLoading} spinner text='Searching lobby...'>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formLobbyCode">
                            <Form.Label>Lobby code</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={e => setCode(e.target.value.toUpperCase())} 
                                maxLength="6" 
                                className="text-uppercase" 
                                placeholder="Enter lobby code" 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => searchCodeLobby(dispatch, state, code)}>
                        Search
                    </Button>
                </Modal.Footer>
            </LoadingOverlay>
        </Modal>
    )
}
