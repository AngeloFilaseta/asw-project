import { useState } from "react"
import { useSelector } from "react-redux"
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import RandomLobbyModal from "./randomLobbyModal/RandomLobbyModal"
import CodeLobbyModal from "./codeLobbyModal/CodeLobbyModal"
import {
    RedirectLobbyCreation,
    RedirectPreviousReports,
    RedirectLobby
} from "../common/GuessrRedirect"

import { AwesomeButton } from "react-awesome-button"

export default function GuessrButtonGroup() {

    let isLoading = useSelector(state => state.util.isLoading)
    let lobbyCode = useSelector(state => state.lobby.info.code)
    const [showRandomLobbyModal, setShowRandomLobbyModal] = useState(false)
    const [showLobbyCodeModal, setShowLobbyCodeModal] = useState(false)
    const [goToLobby, setGoToLobby] = useState(false)
    const [goToLobbyCreation, setGoToLobbyCreation] = useState(false)
    const [goToShowReportPage, setGoToShowReportPage] = useState(false)

    if (goToLobbyCreation) {
        return <RedirectLobbyCreation />
    } else if (goToShowReportPage) {
        return <RedirectPreviousReports />
    } else if (goToLobby || lobbyCode !== null) {
        return <RedirectLobby />
    } else if (goToLobbyCreation) {
        return <RedirectLobbyCreation />
    } else {
        return (
            <div>
                <RandomLobbyModal isShowing={showRandomLobbyModal} onHide={() => { if (!isLoading) setShowRandomLobbyModal(false) }} onSuccess={() => setGoToLobby(true)} />
                <CodeLobbyModal isShowing={showLobbyCodeModal} onHide={() => { if (!isLoading) setShowLobbyCodeModal(false) }} onSuccess={() => setGoToLobby(true)} />
                <Container fluid className="mt-5 p-3 col-11 col-md-6 col-lg-4 border border-primary rounded" style={{ background: "rgba(255,255,255,0.2)" }}>
                    <Row align="center">
                        <Col>
                            <AwesomeButton onPress={() => setGoToLobbyCreation(true)} className="mb-2" style={{ display: 'block', width: '100%', fontSize: 22 }} type="primary" size="large" ripple={true}>Create lobby</AwesomeButton>
                            <AwesomeButton onPress={() => setShowRandomLobbyModal(true)} className="my-2" style={{ display: 'block', width: '100%', fontSize: 22 }} type="primary" size="large" ripple={true}>Join Random Game</AwesomeButton>
                            <AwesomeButton onPress={() => setShowLobbyCodeModal(true)} className="my-2" style={{ display: 'block', width: '100%', fontSize: 22 }} type="primary" size="large" ripple={true}>Join Specific Game</AwesomeButton>
                            <AwesomeButton onPress={() => setGoToShowReportPage(true)} className="mt-2" style={{ display: 'block', width: '100%', fontSize: 22 }} size="large" ripple={true}>Show Previous Reports</AwesomeButton>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
