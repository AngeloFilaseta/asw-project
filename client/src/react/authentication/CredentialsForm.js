import { useState } from "react"
import { useSelector } from "react-redux"

import "react-notifications/lib/notifications.css"
import { NotificationContainer } from "react-notifications"

import LoadingOverlay from "react-loading-overlay"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import GuessrNavbar from "../common/navbar/GuessrNavbar"
import UsernameInput from "./credentialsFormComponents/input/UsernameInput"
import PasswordInput from "./credentialsFormComponents/input/PasswordInput"
import LoginButton from "./credentialsFormComponents/buttons/LoginButton"
import SignupButton from "./credentialsFormComponents/buttons/SignupButton"

export default function CredentialsForm() {

    let isLoading = useSelector(state => state.util.isLoading)
    const [inputUsername, setInputUsername] = useState(undefined)
    const [inputPassword, setInputPassword] = useState(undefined)

    return (
        <div role="main" style={{ overflowX: "hidden" }}>
            <NotificationContainer />
            <GuessrNavbar />
            <Row className="d-flex justify-content-center">
                <div className="my-5 container col-lg-3 col-9 border border-primary rounded" style={{ background: "rgba(255,255,255, 0.7)" }}>
                    <LoadingOverlay active={isLoading} spinner text='Loading...'>
                        <Form className="mt-1 mb-3"  >
                            <UsernameInput username={inputUsername} password={inputPassword} onChange={input => setInputUsername(input)} />
                            <PasswordInput username={inputUsername} password={inputPassword} onChange={input => setInputPassword(input)} />
                            <div className="mt-lg-3">
                                <LoginButton username={inputUsername} password={inputPassword} />
                                <SignupButton username={inputUsername} password={inputPassword} />
                            </div>
                        </Form>
                    </LoadingOverlay>
                </div>
            </Row>
        </div>
    )
}