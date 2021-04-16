import { useState } from "react"
import { useSelector } from "react-redux"

import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import RandomLobbyModal from "./randomLobbyModal/RandomLobbyModal"
import CodeLobbyModal from "./codeLobbyModal/CodeLobbyModal"
import { 
    RedirectLobbyCreation, 
    RedirectPreviousReports,
    RedirectLobby
} from "../common/GuessrRedirect"

export default function GuessrButtonGroup() {

    var isLoading = useSelector(state => state.util.isLoading)
    const [showRandomLobbyModal, setShowRandomLobbyModal] = useState(false)
    const [showLobbyCodeModal, setShowLobbyCodeModal] = useState(false)
    const [goToLobby, setGoToLobby] = useState(false)
    const [goToLobbyCreation, setGoToLobbyCreation] = useState(false)
    const [goToShowReportPage, setGoToShowReportPage] = useState(false)

    if(goToLobbyCreation){
        return <RedirectLobbyCreation />
    } else if (goToShowReportPage){
        return <RedirectPreviousReports />
    } else if (goToLobby){
        return <RedirectLobby />
    } else {
        return (
            <div>
                <RandomLobbyModal isShowing={showRandomLobbyModal} onHide={() => {if(!isLoading) setShowRandomLobbyModal(false)}} onSuccess={() => setGoToLobby(true)} />
                <CodeLobbyModal isShowing={showLobbyCodeModal} onHide={() => {if(!isLoading) setShowLobbyCodeModal(false)}} onSuccess={() => setGoToLobby(true)} />
                <Container fluid className="mt-5 p-3 col-11 col-md-6 col-lg-4 border border-primary rounded">
                    <Row align="center">
                        <Col>
                            <Button block size="lg" onClick={() => setGoToLobbyCreation(true)}>Create Lobby </Button>
                            <Button block size="lg" onClick={() => setShowRandomLobbyModal(true)}>Join Random Game</Button>
                            <Button block size="lg" onClick={() => setShowLobbyCodeModal(true)}>Join Specific Game</Button>
                            <Button block size="lg" onClick={() => setGoToShowReportPage(true)}>Show Previous Reports </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
