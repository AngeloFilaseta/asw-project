import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import LoadingOverlay from "react-loading-overlay"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import LanguageForm from "../../common/LanguageForm"

import { DEFAULT_LANGUAGE } from "../../../util/global"
import searchRandomLobby from "./RandomLobbySearch"

export default function RandomLobbyModal(props){

    const dispatch = useDispatch()
    const [language, setLanguage] = useState(DEFAULT_LANGUAGE)
    let isLoading = useSelector(state => state.util.isLoading)
    let state = useSelector(state => state)

    return (
        <Modal show={props.isShowing} onHide={props.onHide}>
            <LoadingOverlay active={isLoading} spinner text='Searching lobby...'>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formLobbyCode">
                            <Form.Label>Select Lobby Language:</Form.Label>
                            <LanguageForm onChange={e => setLanguage(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => searchRandomLobby(dispatch, state, language)}>
                        Search
                    </Button>
                </Modal.Footer>
            </LoadingOverlay>
        </Modal>
    )
}
