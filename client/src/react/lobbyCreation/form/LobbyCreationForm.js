import { useSelector } from "react-redux"

import "react-notifications/lib/notifications.css"
import { NotificationContainer } from "react-notifications"
import Container from "react-bootstrap/Container"
import LoadingOverlay from "react-loading-overlay"

import GuessrNavbar from "../../common/navbar/GuessrNavbar"
import VisibilitySwitch from "./VisibilitySwitch"
import TurnsInput from "./TurnsInput"
import LanguagesInput from "./LanguagesInput"
import CreateLobbyButton from "./CreateLobbyButton"
import BackToMenuButton from "./BackToMenuButton"

export default function LobbyCreationForm() {

    var isLoading = useSelector(state => state.util.isLoading)

    return (
        <div>
            <NotificationContainer />
            <GuessrNavbar title="" />
            <LoadingOverlay active={isLoading} spinner text='Loading...'>
                <Container role="main" fluid className="rounded mt-5 p-3 col-11 col-md-6 col-lg-4 border border-primary rounded trnsp">
                    <div align="center">
                        <VisibilitySwitch />
                        <TurnsInput />
                        <LanguagesInput />
                        <div className="my-3">
                            <CreateLobbyButton />
                            <BackToMenuButton />
                        </div>
                    </div>
                </Container>
            </LoadingOverlay>
        </div>
    )

}
