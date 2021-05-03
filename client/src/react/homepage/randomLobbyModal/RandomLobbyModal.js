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
    let username = useSelector(state => state.userInfo.username)
    let token = useSelector(state => state.userInfo.token)
    let userId = useSelector(state => state.userInfo.id)
    let isLoading = useSelector(state => state.util.isLoading)

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
                    <Button variant="primary" onClick={() => searchRandomLobby(dispatch, props.onSuccess, language, username, userId, token)}>
                        Search
                    </Button>
                </Modal.Footer>
            </LoadingOverlay>
        </Modal>
    )
}
